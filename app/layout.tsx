import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import { Motion } from "@/components/motion";
import { company } from "@/lib/data";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} | Textile & Garment Manufacturing, Tiruppur`,
    template: `%s | ${company.name}`,
  },
  description:
    "Explore textile development, garment manufacturing and private label possibilities in Tiruppur, Tamil Nadu. Discuss your next collection.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    title: "From fabric to finished product",
    description:
      "Textile and garment manufacturing possibilities, shaped around your brand.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: {
    index: process.env.NEXT_PUBLIC_LAUNCH_READY === "true",
    follow: process.env.NEXT_PUBLIC_LAUNCH_READY === "true",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const verified =
    process.env.NEXT_PUBLIC_LAUNCH_READY === "true" &&
    process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME;
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Motion />
        {verified && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME,
                url: company.url,
              }).replaceAll("<", "\\u003c"),
            }}
          />
        )}
      </body>
    </html>
  );
}
