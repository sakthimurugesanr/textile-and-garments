"use client";
import { useState } from "react";
import { Search, SlidersHorizontal, ArrowRight, Check, X } from "lucide-react";
import { categories, products, Product } from "@/lib/data";
import { ProductCard } from "./common";
import Link from "next/link";
export function Catalog({ category = "" }: { category?: string }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(category);
  const [fabric, setFabric] = useState("");
  const [fit, setFit] = useState("");
  const reset = () => {
    setQuery("");
    setCat(category);
    setFabric("");
    setFit("");
  };
  const filtered = products.filter(
    (p) =>
      (!cat || p.category === cat) &&
      (!fabric || p.fabric === fabric) &&
      (!fit || p.fit === fit) &&
      `${p.name} ${p.code}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="catalog-tabs">
        <button
          aria-pressed={!cat}
          className={!cat ? "selected" : ""}
          onClick={() => setCat("")}
        >
          All products
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCat(c.slug)}
            className={cat === c.slug ? "selected" : ""}
            aria-pressed={cat === c.slug}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="filters">
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Search products"
            placeholder="Search products or references"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Fabric</span>
          <select value={fabric} onChange={(e) => setFabric(e.target.value)}>
            <option value="">All fabrics</option>
            {Array.from(new Set(products.map((p) => p.fabric))).map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Fit</span>
          <select value={fit} onChange={(e) => setFit(e.target.value)}>
            <option value="">All fits</option>
            {Array.from(new Set(products.map((p) => p.fit))).map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <button className="reset" onClick={reset}>
          <SlidersHorizontal size={15} /> Reset filters
        </button>
      </div>
      <p className="results" role="status">
        {filtered.length} sample products · Specifications can be customized
      </p>
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard product={p} key={p.slug} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <h3>No products match your search.</h3>
          <p>Try a different fabric, fit or product name.</p>
          <button className="button" onClick={reset}>
            Reset filters <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
export function readInquiry(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem("textile-inquiry") || "[]");
    return Array.isArray(value)
      ? value.filter(
          (v): v is string =>
            typeof v === "string" && products.some((p) => p.slug === v),
        )
      : [];
  } catch {
    return [];
  }
}
export function saveInquiry(items: string[]) {
  localStorage.setItem("textile-inquiry", JSON.stringify(items));
  window.dispatchEvent(new Event("inquiry-change"));
}
export function AddInquiry({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  function add() {
    try {
      saveInquiry(Array.from(new Set([...readInquiry(), product.slug])));
      setAdded(true);
    } catch {
      setError(
        "Browser storage is unavailable. Include this reference in the quote form.",
      );
    }
  }
  return (
    <>
      <button className="button" onClick={add}>
        {added ? (
          <>
            <Check size={17} /> Added to inquiry
          </>
        ) : (
          <>
            Add to inquiry <ArrowRight size={17} />
          </>
        )}
      </button>
      {added && (
        <Link className="text-link" href="/request-a-quote">
          View inquiry list <ArrowRight size={16} />
        </Link>
      )}
      <Link
        className="button outline"
        href={`/request-a-quote?product=${product.slug}&sample=true`}
      >
        Request a sample
      </Link>
      <span role="status">{error}</span>
    </>
  );
}
export function InquiryItems({
  items,
  onRemove,
}: {
  items: string[];
  onRemove: (slug: string) => void;
}) {
  return (
    <div className="inquiry-items">
      {items.length ? (
        items.map((slug) => {
          const p = products.find((p) => p.slug === slug);
          return (
            p && (
              <div key={slug}>
                <span>
                  <strong>{p.name}</strong>
                  <small>
                    {p.code} · {p.fabric}
                  </small>
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(slug)}
                  aria-label={`Remove ${p.name}`}
                >
                  <X size={18} />
                </button>
              </div>
            )
          );
        })
      ) : (
        <p>
          No products selected yet.{" "}
          <Link href="/products">Browse the sample catalog</Link> or describe
          your own product below.
        </p>
      )}
    </div>
  );
}
