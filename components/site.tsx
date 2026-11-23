"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  MapPin,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { company } from "@/lib/data";
export function Logo() {
  return (
    <Link href="/" className="brand" aria-label={`${company.name} home`}>
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        {company.name}
        <small>TEXTILES & GARMENTS</small>
      </span>
    </Link>
  );
}
const groups = [
  {
    label: "About us",
    href: "/about",
    children: [
      ["Our story", "/about"],
      ["Infrastructure", "/infrastructure"],
      ["Quality assurance", "/quality"],
      ["Sustainability", "/sustainability"],
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      ["All products", "/products"],
      ["Men", "/products/category/men"],
      ["Women", "/products/category/women"],
      ["Kids & babies", "/products/category/kids-and-babies"],
      [
        "Business & institutional",
        "/products/category/business-and-institutional",
      ],
      ["Home textiles", "/products/category/home-textiles"],
    ],
  },
  {
    label: "Capabilities",
    href: "/services",
    children: [
      ["Our services", "/services"],
      ["Fabrics & materials", "/fabrics"],
      ["Manufacturing process", "/manufacturing-process"],
      ["Private label & OEM", "/private-label"],
      ["Export & logistics", "/exports"],
    ],
  },
  {
    label: "Resources",
    href: "/insights",
    children: [
      ["Insights", "/insights"],
      ["Gallery", "/gallery"],
      ["FAQs", "/faq"],
    ],
  },
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const path = usePathname();
  useEffect(() => {
    const sync = () => {
      try {
        setCount(
          JSON.parse(localStorage.getItem("textile-inquiry") || "[]").length,
        );
      } catch {
        setCount(0);
      }
    };
    sync();
    window.addEventListener("inquiry-change", sync);
    return () => window.removeEventListener("inquiry-change", sync);
  }, []);
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            <MapPin size={12} /> Tiruppur, Tamil Nadu, India
          </span>
          <span>
            Thoughtfully made. From thread to finish.
            <span className="topbar-dot">✦</span> Domestic & international
            inquiries
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container nav-row">
          <Logo />
          <nav aria-label="Main navigation" className="desktop-nav">
            <Link className={path === "/" ? "active" : ""} href="/">
              Home
            </Link>
            {groups.map((g) => (
              <div className="nav-group" key={`${g.label}-${path}`}>
                <Link
                  className={path.startsWith(g.href) ? "active" : ""}
                  href={g.href}
                >
                  {g.label}
                </Link>
                <details>
                  <summary aria-label={`Expand ${g.label}`}>
                    <ChevronDown size={12} />
                  </summary>
                  <div className="dropdown">
                    {g.children.map(([label, url]) => (
                      <Link key={url} href={url}>
                        {label}
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
            ))}
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link
              className="bag"
              href="/request-a-quote"
              aria-label={`Inquiry list, ${count} products`}
            >
              <ShoppingBag size={19} />
              {count > 0 && <span>{count}</span>}
            </Link>
            <Link className="button small header-quote" href="/request-a-quote">
              Request a Quote <ArrowUpRight size={16} />
            </Link>
            <button
              className="menu-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            {groups.map((g) => (
              <details key={g.label}>
                <summary>
                  {g.label}
                  <ChevronDown size={16} />
                </summary>
                {g.children.map(([label, url]) => (
                  <Link key={url} href={url} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                ))}
              </details>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/request-a-quote" onClick={() => setOpen(false)}>
              Request a quote <ArrowUpRight size={16} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
export function Footer() {
  return (
    <>
      <section className="final-cta">
        <div className="container cta-row">
          <div>
            <span className="eyebrow light">
              YOUR NEXT COLLECTION STARTS WITH A CONVERSATION
            </span>
            <h2>
              Good ideas deserve
              <br />a great making partner.
            </h2>
          </div>
          <Link className="button ivory" href="/request-a-quote">
            Let’s discuss your project <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="footer-main">
            <div>
              <Logo />
              <p>
                From fabric to finished product.
                <br />
                Considered manufacturing, shaped around you.
              </p>
              <span className="location">
                <MapPin size={14} />
                {company.location}
              </span>
            </div>
            <div>
              <h3>Explore</h3>
              {[
                ["Our story", "/about"],
                ["Products", "/products"],
                ["Services", "/services"],
                ["Fabrics & materials", "/fabrics"],
                ["Our process", "/manufacturing-process"],
              ].map(([label, url]) => (
                <Link key={url} href={url}>
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <h3>Learn more</h3>
              {[
                ["Quality assurance", "/quality"],
                ["Sustainability", "/sustainability"],
                ["Private label & OEM", "/private-label"],
                ["Export & logistics", "/exports"],
                ["Infrastructure", "/infrastructure"],
              ].map(([label, url]) => (
                <Link key={url} href={url}>
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <h3>Let’s connect</h3>
              <Link href="/contact">
                Contact details <ArrowUpRight size={13} />
              </Link>
              <Link href="/request-a-quote">Request a quote</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/faq">FAQs</Link>
            </div>
          </div>
          <div className="sample-notice">
            Preview website · Company details, catalog and capabilities are
            editable samples. Stock and AI imagery is illustrative and does not
            show company facilities.
          </div>
          <div className="footer-bottom">
            <span>© 2026 {company.name}. All rights reserved.</span>
            <span>
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/terms">Terms & conditions</Link>
              <a href="#top">Back to top ↑</a>
            </span>
          </div>
        </div>
      </footer>
      <Link className="mobile-inquiry" href="/request-a-quote">
        Discuss your project <ArrowRight size={16} />
      </Link>
    </>
  );
}
