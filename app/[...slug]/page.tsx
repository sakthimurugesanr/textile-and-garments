import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  pageInfo,
  products,
  categories,
  services,
  articles,
  company,
  images,
} from "@/lib/data";
import {
  PageHero,
  SampleNote,
  Media,
  ProductCard,
  TextLink,
} from "@/components/common";
import { PageContent, RelatedProducts } from "@/components/page-content";
import { Catalog, AddInquiry } from "@/components/catalog";
type Props = { params: Promise<{ slug: string[] }> };
// This catalog resolves URL-specific content before returning a page or an HTTP 404.
export const instant = false;
export function generateStaticParams() {
  return [
    ...Object.keys(pageInfo).map((s) => ({ slug: [s] })),
    ...products.map((p) => ({ slug: ["products", p.slug] })),
    ...categories.map((c) => ({ slug: ["products", "category", c.slug] })),
    ...services.map((s) => ({ slug: ["services", s.slug] })),
    ...articles.map((a) => ({ slug: ["insights", a.slug] })),
  ];
}
function resolve(slug: string[]) {
  if (slug.length === 1) return pageInfo[slug[0]];
  if (slug[0] === "products" && slug[1] === "category" && slug.length === 3) {
    const c = categories.find((c) => c.slug === slug[2]);
    if (c)
      return {
        title: `${c.name} collection`,
        eyebrow: "Product collection",
        intro: c.description,
      };
  }
  if (slug.length !== 2) return;
  const data =
    slug[0] === "products"
      ? products.find((p) => p.slug === slug[1])
      : slug[0] === "services"
        ? services.find((s) => s.slug === slug[1])
        : slug[0] === "insights"
          ? articles.find((a) => a.slug === slug[1])
          : undefined;
  if (data)
    return {
      title: "name" in data ? data.name : data.title,
      eyebrow: slug[0],
      intro:
        "intro" in data
          ? data.intro
          : "A configurable product direction, ready to develop around your brand.",
    };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = resolve(slug);
  if (!data) return { title: "Page not found" };
  const path = `/${slug.join("/")}`;
  const description =
    slug[0] === "products" && slug.length === 2
      ? `${data.title}. Explore fabric, fit, GSM, branding and packaging options for your collection. MOQ and lead time are subject to confirmation.`
      : data.intro;
  return {
    title: data.title,
    description,
    alternates: { canonical: path },
    openGraph: { title: data.title, description, url: path },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = resolve(slug);
  if (!data) notFound();
  const crumbs = [
    ...(slug.length > 1
      ? [
          {
            name: slug[0][0].toUpperCase() + slug[0].slice(1),
            href: `/${slug[0]}`,
          },
        ]
      : []),
    { name: slug.length === 1 ? data.eyebrow : data.title },
  ];
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", item: company.url },
      ...crumbs.map((c) => ({
        name: c.name,
        item: `${company.url}${c.href || "/" + slug.join("/")}`,
      })),
    ].map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
  };
  let content: React.ReactNode;
  if (slug.length === 1) content = <PageContent slug={slug[0]} />;
  else if (slug[0] === "products" && slug[1] === "category")
    content = (
      <>
        <SampleNote />
        <Catalog category={slug[2]} />
      </>
    );
  else if (slug[0] === "products") {
    const p = products.find((p) => p.slug === slug[1])!;
    content = (
      <>
        <SampleNote />
        <div className="product-detail">
          <div>
            <Media
              src={p.image}
              alt={`Illustrative reference for ${p.name}`}
              className="product-main-image"
            />
            <div className="product-gallery">
              <Media
                src={images.fabric}
                alt="Illustrative fabric development reference"
              />
              <Media
                src={images.shirts}
                alt="Illustrative garment collection reference"
              />
            </div>
            <p className="mini">
              Illustrative reference images · Not photographs of this specific
              product.
            </p>
          </div>
          <div>
            <span className="eyebrow">SAMPLE PRODUCT / {p.code}</span>
            <h2>{p.name}</h2>
            <p>
              A starting point for your collection. Develop the fabric,
              silhouette, colors and branding around your intended wearer and
              approved specifications.
            </p>
            <dl className="specifications">
              {[
                [
                  "Fabric options",
                  `${p.fabric}; alternative compositions subject to development`,
                ],
                [
                  "Composition",
                  "Confirm exact fiber percentages with the team",
                ],
                ["Indicative GSM", p.gsm],
                ["Fit", p.fit],
                [
                  "Size range",
                  "Buyer-defined size chart; grading subject to approval",
                ],
                [
                  "Colors",
                  "Custom shades subject to lab-dip approval and availability",
                ],
                [
                  "Decoration",
                  "Print, embroidery or transfer options subject to fabric compatibility",
                ],
                [
                  "Branding & packaging",
                  "Labels, hang tags, folding and packing to agreed instructions",
                ],
                ["Minimum order quantity", "Confirm with our team"],
                ["Lead time", "Depends on specifications and order volume"],
                [
                  "Care",
                  "Final instructions depend on approved composition, finish and test results",
                ],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>
            <div className="product-actions">
              <AddInquiry product={p} />
            </div>
          </div>
        </div>
        <section className="related-products">
          <h2>More possibilities.</h2>
          <div className="product-grid">
            {products
              .filter((x) => x.category === p.category && x.slug !== p.slug)
              .slice(0, 3)
              .map((x) => (
                <ProductCard key={x.slug} product={x} />
              ))}
          </div>
        </section>
      </>
    );
  } else if (slug[0] === "services") {
    const s = services.find((s) => s.slug === slug[1])!;
    content = (
      <>
        <SampleNote>
          Sample capability · Availability and the split between in-house
          operations and approved production partners must be confirmed. No
          operation is represented here as verified in-house.
        </SampleNote>
        <div className="service-detail">
          <aside>
            <span className="eyebrow">EXPLORE SERVICES</span>
            {services.map((x) => (
              <Link
                className={x.slug === s.slug ? "selected" : ""}
                key={x.slug}
                href={`/services/${x.slug}`}
              >
                {x.name}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </aside>
          <article>
            <h2>What this can include.</h2>
            <ul className="scope-list">
              {s.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h2>Available options</h2>
            <p>
              Scope can be developed around your product, quantity, material and
              target finish. Specific techniques, equipment and partner
              involvement require confirmation before costing.
            </p>
            <h2>Quality checkpoints</h2>
            <p>{s.checks}</p>
            <h2>What to share with us</h2>
            <p>{s.inputs}</p>
            <div className="notice">
              Approval before bulk production: confirm the sample,
              specifications, commercial terms and schedule in writing.
            </div>
            <TextLink href="/request-a-quote">Discuss this service</TextLink>
          </article>
        </div>
        <RelatedProducts />
      </>
    );
  } else {
    const a = articles.find((a) => a.slug === slug[1])!;
    content = (
      <>
        <article className="reading-width article-body">
          <span className="eyebrow">{a.tag} · EDITORIAL GUIDE</span>
          <Media src={images.fabric} alt="Illustrative textile texture" />
          {a.sections.map(([heading, text]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
          <div className="notice">
            General buyer guidance · Actual material behavior and commercial
            details depend on the approved product specification.
          </div>
          <TextLink href="/request-a-quote">Put your brief together</TextLink>
        </article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              description: a.intro,
              mainEntityOfPage: `${company.url}/insights/${a.slug}`,
            }).replaceAll("<", "\\u003c"),
          }}
        />
      </>
    );
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replaceAll("<", "\\u003c"),
        }}
      />
      <PageHero {...data} crumbs={crumbs} />
      <div className="section container inner-content">{content}</div>
    </>
  );
}
