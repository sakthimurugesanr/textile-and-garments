"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { images } from "@/lib/data";
import gsap from "gsap";
const photos = [
  ["Factory", images.factory, "AI-generated fabric workshop concept"],
  ["Fabric", images.fabric, "Textile texture in neutral tones"],
  ["Production", images.textile, "Clothing production reference"],
  ["Printing", images.garment, "Plain garment for print placement reference"],
  ["Embroidery", images.shirts, "Garment finishing reference"],
  [
    "Finished garments",
    images.fashion,
    "Finished clothing collection reference",
  ],
  ["Packaging", images.shirts, "Clothing presentation reference"],
];
export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [current, setCurrent] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const shown = photos.filter((p) => filter === "All" || p[0] === filter);
  useEffect(() => {
    if (!grid.current) return;
    const elements = Array.from(grid.current.children);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        elements,
        { y: 12 },
        {
          y: 0,
          duration: 0.35,
          stagger: 0.025,
          ease: "power2.out",
          clearProps: "transform",
        },
      );
    });
    return () => motion.revert();
  }, [filter]);
  useEffect(() => {
    if (current !== null) dialog.current?.showModal();
    else if (dialog.current?.open) {
      dialog.current.close();
      opener.current?.focus();
    }
  }, [current]);
  const step = (dir: number) =>
    setCurrent((c) =>
      c === null ? null : (c + dir + shown.length) % shown.length,
    );
  return (
    <>
      <div className="catalog-tabs">
        {["All", ...photos.map((p) => p[0])].map((p) => (
          <button
            className={p === filter ? "selected" : ""}
            aria-pressed={p === filter}
            key={p}
            onClick={() => setFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="gallery-grid" ref={grid}>
        {shown.map(([tag, src, alt], i) => (
          <button
            key={tag}
            onClick={(e) => {
              opener.current = e.currentTarget;
              setCurrent(i);
            }}
            className="gallery-item"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width:700px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
            <span>
              {tag}
              <Maximize2 size={18} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={() => setCurrent(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setCurrent(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label="Illustrative image viewer"
      >
        {current !== null && (
          <>
            <button
              className="lightbox-close"
              onClick={() => setCurrent(null)}
              aria-label="Close image"
            >
              <X />
            </button>
            <div className="lightbox-image">
              <Image
                src={shown[current][1]}
                alt={shown[current][2]}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="lightbox-controls">
              <button onClick={() => step(-1)} aria-label="Previous image">
                <ArrowLeft />
              </button>
              <span>{shown[current][0]} · Illustrative image</span>
              <button onClick={() => step(1)} aria-label="Next image">
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
