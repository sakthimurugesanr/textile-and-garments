import { NextRequest, NextResponse } from "next/server";
import { pageInfo, products, categories, services, articles } from "@/lib/data";

// Reject unknown catalog paths before streaming commits an HTTP 200 response.
const knownPaths = new Set([
  "/",
  ...Object.keys(pageInfo).map((slug) => `/${slug}`),
  ...products.map((p) => `/products/${p.slug}`),
  ...categories.map((c) => `/products/category/${c.slug}`),
  ...services.map((s) => `/services/${s.slug}`),
  ...articles.map((a) => `/insights/${a.slug}`),
]);

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  if (knownPaths.has(path)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
}

export const config = {
  matcher: [
    "/((?!api/|_next/|images/|favicon.ico|robots.txt|sitemap.xml|opengraph-image|.*\\.svg$).*)",
  ],
};
