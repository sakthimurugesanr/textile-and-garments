"use client";
import { useEffect, useState, useSyncExternalStore, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Upload, Info } from "lucide-react";
import Link from "next/link";
import { categories, products } from "@/lib/data";
import {
  inquirySchema,
  InquiryValues,
  fileTypes,
  maxFileSize,
} from "@/lib/validation";
import { InquiryItems, readInquiry, saveInquiry } from "./catalog";
function subscribe(listener: () => void) {
  window.addEventListener("inquiry-change", listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener("inquiry-change", listener);
    window.removeEventListener("storage", listener);
  };
}
function snapshot() {
  const slug = new URLSearchParams(window.location.search).get("product");
  return JSON.stringify(
    Array.from(
      new Set([
        ...readInquiry(),
        ...(slug && products.some((p) => p.slug === slug) ? [slug] : []),
      ]),
    ),
  );
}
export function QuoteForm({ contact = false }: { contact?: boolean }) {
  const stored = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const items = useMemo<string[]>(() => JSON.parse(stored), [stored]);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [result, setResult] = useState<{ message: string; ok: boolean } | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      category: contact ? "General inquiry" : "",
      fabric: "",
      quantity: contact ? "1" : "",
      sizes: "",
      decoration: "",
      branding: "",
      packaging: "",
      date: "",
      message: "",
      consent: false,
      website: "",
      products: [],
      sample: false,
    },
  });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValue("products", items);
    setValue("sample", params.get("sample") === "true");
    const p = products.find((p) => p.slug === params.get("product"));
    if (p) setValue("category", p.category);
  }, [items, setValue]);
  const remove = (slug: string) => {
    const next = items.filter((s) => s !== slug);
    const url = new URL(window.location.href);
    if (url.searchParams.get("product") === slug) {
      url.searchParams.delete("product");
      window.history.replaceState(null, "", url);
    }
    setValue("products", next);
    try {
      saveInquiry(next);
    } catch {}
  };
  async function submit(values: InquiryValues) {
    setResult(null);
    if (fileError) return;
    const body = new FormData();
    body.set("data", JSON.stringify(values));
    if (file) body.set("file", file);
    try {
      const response = await fetch("/api/inquiry", { method: "POST", body });
      const json = await response.json();
      setResult({
        message: json.message || "Unable to submit. Please try again.",
        ok: response.ok,
      });
    } catch {
      setResult({
        message:
          "The connection failed. Your inquiry has not been sent. Please try again.",
        ok: false,
      });
    }
  }
  function field(
    name: keyof InquiryValues,
    label: string,
    required = false,
    type = "text",
  ) {
    return (
      <div className="field" key={name}>
        <label htmlFor={name}>
          {label}
          {required && <b> *</b>}
        </label>
        <input
          id={name}
          {...register(name)}
          type={type}
          aria-required={required}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <small className="field-error" id={`${name}-error`}>
            {errors[name]?.message}
          </small>
        )}
      </div>
    );
  }
  return (
    <div className="quote-layout">
      <aside className="quote-aside">
        <span className="eyebrow">YOUR PROJECT BRIEF</span>
        <h2>
          A few details.
          <br />A better beginning.
        </h2>
        <p>
          Share what you know. Fabric, fit and finishing decisions can be
          developed together.
        </p>
        <ol>
          <li>Tell us about your product</li>
          <li>Share specifications or references</li>
          <li>Discuss feasibility and next steps</li>
        </ol>
        <div className="notice">
          <Info size={18} />
          <div>
            <strong>Demo mode</strong>
            <p>
              Email delivery and file storage are not configured. This form
              validates your brief but cannot send or retain an inquiry. No
              submission is silently discarded.
            </p>
          </div>
        </div>
        <p className="mini">
          Please use sample data during testing. Do not upload confidential tech
          packs.
        </p>
      </aside>
      <form className="quote-form" onSubmit={handleSubmit(submit)} noValidate>
        <h3>01 / Your details</h3>
        <div className="form-grid">
          {field("name", "Full name", true)}
          {field("company", "Company name", true)}
          {field("email", "Business email", true, "email")}
          {field("phone", "Phone number", false, "tel")}
          {field("country", "Country", true)}
        </div>
        <h3>02 / Product requirements</h3>
        <InquiryItems items={items} onRemove={remove} />
        <div className="form-grid">
          <label className="field">
            <span>
              Product category <b>*</b>
            </span>
            <select {...register("category")} aria-invalid={!!errors.category}>
              <option value="">Select category</option>
              <option>General inquiry</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <small className="field-error">{errors.category.message}</small>
            )}
          </label>
          {field("fabric", "Fabric preference")}
          {field("quantity", "Estimated quantity", true, "number")}
          {field("sizes", "Size requirements")}
          {field("decoration", "Printing or embroidery")}
          {field("branding", "Branding requirements")}
          {field("packaging", "Packaging requirements")}
          {field("date", "Preferred delivery date", false, "date")}
        </div>
        <label className="check-label">
          <input type="checkbox" {...register("sample")} /> I would like to
          discuss a sample.
        </label>
        <label className="field">
          <span>
            Additional message <b>*</b>
          </span>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Describe your garment, quantities, colors and any details that matter."
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <small className="field-error">{errors.message.message}</small>
          )}
        </label>
        <label className="upload">
          <Upload size={22} />
          <span>
            Attach a tech pack or reference{" "}
            <small>PDF, JPG or PNG · Maximum 5 MB · Optional</small>
          </span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setFile(null);
              setFileError("");
              if (f && (!fileTypes.includes(f.type) || f.size > maxFileSize)) {
                setFileError("Choose a PDF, JPG or PNG smaller than 5 MB.");
                e.target.value = "";
              } else setFile(f);
            }}
          />
        </label>
        {file && <p className="mini">Selected: {file.name}</p>}
        {fileError && (
          <p role="alert" className="field-error">
            {fileError}
          </p>
        )}
        <label className="honeypot" aria-hidden="true">
          Leave empty
          <input {...register("website")} tabIndex={-1} autoComplete="off" />
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            {...register("consent")}
            aria-invalid={!!errors.consent}
          />
          <span>
            I agree to the <Link href="/privacy">privacy policy</Link> and the
            use of my details to respond to this inquiry. <b>*</b>
          </span>
        </label>
        {errors.consent && (
          <p className="field-error">{errors.consent.message}</p>
        )}
        <button
          className="button"
          type="submit"
          disabled={isSubmitting || !!fileError}
        >
          {isSubmitting ? "Validating inquiry…" : "Validate inquiry · Demo"}
          <ArrowUpRight size={17} />
        </button>
        {result && (
          <div
            role={result.ok ? "status" : "alert"}
            className={`form-result ${result.ok ? "success" : ""}`}
          >
            {result.message}
          </div>
        )}
        <p className="mini">
          Required fields are marked *. Commercial terms are subject to
          specification review and written confirmation.
        </p>
      </form>
    </div>
  );
}
