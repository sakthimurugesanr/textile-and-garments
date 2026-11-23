import { inquirySchema, fileTypes, maxFileSize } from "@/lib/validation";
import { products } from "@/lib/data";
const attempts = new Map<string, { count: number; reset: number }>();
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { message: "Request origin is not allowed." },
      { status: 403 },
    );
  const key =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  for (const [k, v] of attempts) if (v.reset < now) attempts.delete(k);
  const bucket = attempts.get(key) || { count: 0, reset: now + 60000 };
  bucket.count++;
  attempts.set(key, bucket);
  if (bucket.count > 5)
    return Response.json(
      { message: "Too many attempts. Please wait one minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  if (Number(request.headers.get("content-length") || 0) > maxFileSize + 100000)
    return Response.json(
      { message: "The request is too large." },
      { status: 413 },
    );
  try {
    const reader = request.body?.getReader();
    if (!reader)
      return Response.json(
        { message: "An inquiry body is required." },
        { status: 400 },
      );
    const chunks: ArrayBuffer[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxFileSize + 100000) {
        await reader.cancel();
        return Response.json(
          { message: "The request is too large." },
          { status: 413 },
        );
      }
      chunks.push(value.slice().buffer);
    }
    const form = await new Response(new Blob(chunks), {
      headers: { "Content-Type": request.headers.get("content-type") || "" },
    }).formData();
    const raw = form.get("data");
    if (typeof raw !== "string" || raw.length > 40000)
      return Response.json(
        { message: "Invalid inquiry data." },
        { status: 400 },
      );
    const parsed = inquirySchema.safeParse(JSON.parse(raw));
    if (!parsed.success)
      return Response.json(
        {
          message: "Please check the required fields and privacy consent.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    if (
      parsed.data.products.some(
        (slug) => !products.some((p) => p.slug === slug),
      )
    )
      return Response.json(
        { message: "A product reference is invalid." },
        { status: 400 },
      );
    const file = form.get("file");
    if (file instanceof File && file.size) {
      if (!fileTypes.includes(file.type) || file.size > maxFileSize)
        return Response.json(
          { message: "Use a PDF, JPG or PNG no larger than 5 MB." },
          { status: 400 },
        );
      const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
      const valid =
        file.type === "application/pdf"
          ? String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-"
          : file.type === "image/png"
            ? [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v)
            : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      if (!valid)
        return Response.json(
          { message: "The file contents do not match its declared type." },
          { status: 400 },
        );
    }
    return Response.json(
      {
        message:
          "Your brief passed validation. Demo mode: nothing was sent or stored. Configure a verified delivery and storage integration before accepting live inquiries.",
      },
      { status: 503 },
    );
  } catch {
    return Response.json(
      {
        message:
          "We could not validate this request. Your inquiry was not sent.",
      },
      { status: 400 },
    );
  }
}
