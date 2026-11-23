import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Product, faqs } from "@/lib/data";
export function Media({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`media ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 50vw"
        preload={priority}
        loading={priority ? "eager" : undefined}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  description,
  href,
  link,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && <TextLink href={href}>{link || "Explore more"}</TextLink>}
    </div>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={i}>
          <ChevronRight size={12} />
          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
          ) : (
            <span aria-current="page">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageHero({
  title,
  eyebrow,
  intro,
  crumbs,
}: {
  title: string;
  eyebrow: string;
  intro: string;
  crumbs?: { name: string; href?: string }[];
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumb items={crumbs || [{ name: eyebrow }]} />
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
export function SampleNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="notice">
      {children ||
        "Sample catalog · Availability, specifications and in-house or partner operations must be confirmed with the company."}
    </p>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link className="product-card" href={`/products/${product.slug}`}>
      <Media
        src={product.image}
        alt={`Illustrative stock image for ${product.name}`}
      />
      <div className="product-meta">
        <span>
          {product.fabric} · {product.fit}
        </span>
        <span>{product.code}</span>
      </div>
      <div className="product-title">
        <h3>{product.name}</h3>
        <ArrowUpRight size={20} />
      </div>
      <span className="mini">Customize to your brief</span>
    </Link>
  );
}
export function FAQList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map(([q, a], i) => (
        <details key={q}>
          <summary>
            <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
            {q}
            <span className="plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
