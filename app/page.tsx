import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Layers,
  Scissors,
  PackageCheck,
  MoveDown,
} from "lucide-react";
import { Media, SectionTitle, TextLink, FAQList } from "@/components/common";
import { categories, images, services, articles } from "@/lib/data";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span /> FROM TIRUPPUR. MADE FOR YOUR VISION.
            </div>
            <h1>
              Good fabric.
              <br />
              Great garments.
              <br />
              <em>Your signature.</em>
            </h1>
            <p>
              Textile & garment manufacturing, from fabric to finished product.
              A considered approach to bringing your next collection to life.
            </p>
            <div className="hero-buttons">
              <Link className="button" href="/request-a-quote">
                Request a Quote <ArrowUpRight size={18} />
              </Link>
              <Link className="button ghost" href="/products">
                Explore our products <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-foot">
              <span className="little-line" />
              <p>
                FABRIC DEVELOPMENT <span> / </span> GARMENT MANUFACTURING{" "}
                <span> / </span> PRIVATE LABEL
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="image-corner">THE ART OF MAKING, TOGETHER.</div>
            <Media
              src={images.hero}
              alt="AI-generated illustrative textile detail in natural tones"
              className="hero-image"
              priority
            />
            <div className="hero-photo-label">
              <span>
                FROM THE FIRST THREAD
                <br />
                TO THE FINAL DETAIL.
              </span>
              <span className="seal">
                MADE
                <br />
                <b>with care</b>
                <br />
                IN EVERY DETAIL
              </span>
            </div>
            <span className="image-credit">
              Illustrative imagery · AI textile concept
            </span>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>
            Thoughtfully sourced. Carefully developed. Ready for your brand.
          </span>
          <a href="#collection">
            Discover the possibilities <MoveDown size={15} />
          </a>
        </div>
      </section>
      <div className="capability-strip">
        <div className="container">
          <span>
            <Layers size={19} /> Fabric to finished garment
          </span>
          <span>
            <Scissors size={19} /> Custom development
          </span>
          <span>
            <PackageCheck size={19} /> Private label & OEM
          </span>
          <span>
            <span className="globe-icon">◎</span> Domestic & export inquiries
          </span>
        </div>
      </div>
      <section id="collection" className="section container" data-reveal>
        <SectionTitle
          eyebrow="CRAFTED FOR EVERYDAY. DEVELOPED FOR YOU."
          title="A collection of possibilities."
          description="From wardrobe essentials to purpose-built collections. Find a starting point, then make it your own."
          href="/products"
          link="Explore all products"
        />
        <div className="category-showcase">
          {categories.slice(0, 3).map((c, i) => (
            <Link
              key={c.slug}
              href={`/products/category/${c.slug}`}
              className="category-tile"
            >
              <Media
                src={c.image}
                alt={`Illustrative ${c.name.toLowerCase()} clothing collection`}
              />
              <span className="tile-index">0{i + 1} / COLLECTION</span>
              <div>
                <h3>{c.name}</h3>
                <span className="round-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <p>{c.description}</p>
            </Link>
          ))}
        </div>
        <div className="category-extra">
          <span>More to make your own</span>
          {categories.slice(3).map((c) => (
            <TextLink key={c.slug} href={`/products/category/${c.slug}`}>
              {c.name}
            </TextLink>
          ))}
        </div>
        <p className="mini">
          Sample product directions · Availability and specifications are
          subject to confirmation.
        </p>
      </section>
      <section className="intro-section">
        <div className="container split">
          <div className="intro-visual">
            <Media
              src={images.fabric}
              alt="Illustrative natural fabric texture"
            />
            <div className="material-label">
              <span>IT ALL STARTS WITH</span>
              <strong>The right thread.</strong>
              <span>COMPOSITION · TEXTURE · PURPOSE</span>
            </div>
          </div>
          <div className="intro-copy" data-reveal>
            <span className="eyebrow">A PARTNER IN THE MAKING</span>
            <h2>
              Rooted in craft.
              <br />
              Focused on
              <br />
              <em>what’s next.</em>
            </h2>
            <p>
              Based in Tiruppur, Tamil Nadu, [Company Name] is an editable
              company profile for textile manufacturing, garment development and
              private label inquiries.
            </p>
            <p>
              Every collection begins with a conversation: what you want to
              create, who it is for, and the details that make it yours. Explore
              an end-to-end approach shaped around your brief.
            </p>
            <TextLink href="/about">Get to know us</TextLink>
            <div className="intro-location">
              11.1085° N, 77.3411° E <span>TIRUPPUR, INDIA</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section container" data-reveal>
        <SectionTitle
          eyebrow="ONE BRIEF. A CONNECTED PROCESS."
          title="From your idea to its final form."
          href="/services"
          link="Explore our capabilities"
        />
        <div className="services-editorial">
          {[services[0], services[1], services[5], services[6]].map((s, i) => (
            <Link
              className="service-row"
              href={`/services/${s.slug}`}
              key={s.slug}
            >
              <span className="service-number">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>
                {
                  [
                    "Develop the details. Refine the fit. Approve your vision.",
                    "Find the composition, weight and handle your product needs.",
                    "Connect cutting, stitching, finishing and inspection.",
                    "Your identity, considered from labels to packaging.",
                  ][i]
                }
              </p>
              <span className="round-arrow">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="fabric-band">
        <div className="container">
          <div>
            <span className="eyebrow light">
              THE FOUNDATION OF A GREAT GARMENT
            </span>
            <h2>
              Feel the difference.
              <br />
              Find your fabric.
            </h2>
            <p>
              Composition, construction and GSM work together.
              <br />
              Let the end use guide your material choices.
            </p>
            <TextLink href="/fabrics">Explore fabrics & materials</TextLink>
          </div>
          <div className="fabric-swatches">
            {["Cotton", "Cotton blends", "French terry", "Piqué"].map(
              (f, i) => (
                <Link href="/fabrics" key={f} className={`swatch swatch-${i}`}>
                  <span>
                    {f}
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="section container process-preview" data-reveal>
        <SectionTitle
          eyebrow="CLARITY AT EVERY STEP"
          title="A considered journey, together."
          description="From the first conversation to dispatch, with your approval at the moments that matter."
          href="/manufacturing-process"
          link="See the full process"
        />
        <div className="process-preview-grid">
          {[
            [
              "01",
              "Discover & define",
              "Your brief, specifications and material direction.",
            ],
            [
              "02",
              "Develop & approve",
              "Samples, fit checks and agreed details.",
            ],
            [
              "03",
              "Make & inspect",
              "Production guided by the approved reference.",
            ],
            [
              "04",
              "Pack & dispatch",
              "Packing instructions and coordinated handover.",
            ],
          ].map(([n, title, desc]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="quality-section">
        <div className="container split">
          <div>
            <span className="eyebrow">THE DETAILS MAKE THE DIFFERENCE</span>
            <h2>
              Quality, woven
              <br />
              into the process.
            </h2>
            <p>
              From incoming materials to the finished garment, an agreed quality
              plan keeps attention where it belongs: on your product.
            </p>
            <ul className="check-list">
              {[
                "Fabric weight, shade & shrinkage",
                "Measurements & stitching",
                "Finishing, labels & packing",
              ].map((s) => (
                <li key={s}>
                  <Check size={16} />
                  {s}
                </li>
              ))}
            </ul>
            <TextLink href="/quality">Our approach to quality</TextLink>
          </div>
          <div className="quality-visual">
            <Media
              src={images.textile}
              alt="Illustrative garment and textile details"
            />
            <span className="image-credit">
              Illustrative imagery · Facility details awaiting verification
            </span>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="paired-features">
          <div>
            <span className="eyebrow">SPACE FOR YOUR IDENTITY</span>
            <h2>
              Your label.
              <br />
              Your point of view.
            </h2>
            <p>
              For emerging labels, established brands and business collections.
              Explore custom garments, branding and packaging options.
            </p>
            <TextLink href="/private-label">
              Discover private label & OEM
            </TextLink>
          </div>
          <div>
            <span className="eyebrow">A MORE CONSIDERED APPROACH</span>
            <h2>
              Better questions.
              <br />
              Better decisions.
            </h2>
            <p>
              Material choices, waste reduction and responsible sourcing begin
              with transparency. Explore proposed initiatives for company
              review.
            </p>
            <TextLink href="/sustainability">
              Explore our sustainability approach
            </TextLink>
          </div>
        </div>
        <div className="market-line">
          <span>COLLECTIONS FOR</span>
          <p>
            Clothing brands <i>·</i> Retailers <i>·</i> Corporate teams <i>·</i>{" "}
            Institutions <i>·</i> Home & hospitality
          </p>
        </div>
        <div className="infrastructure-link">
          <div>
            <span className="eyebrow">BEHIND THE MAKING</span>
            <h3>See where each stage comes together.</h3>
          </div>
          <TextLink href="/infrastructure">Explore infrastructure</TextLink>
          <TextLink href="/exports">Export & logistics</TextLink>
        </div>
      </section>
      <section className="faq-home">
        <div className="container split">
          <div>
            <span className="eyebrow">BEFORE WE BEGIN</span>
            <h2>
              A few things
              <br />
              you might ask.
            </h2>
            <p>A good partnership begins with clear expectations.</p>
            <TextLink href="/faq">View all questions</TextLink>
          </div>
          <FAQList limit={4} />
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow="NOTES FROM THE MAKING"
          title="A little insight goes a long way."
          href="/insights"
          link="Read all insights"
        />
        <div className="article-grid">
          {articles.slice(0, 3).map((a, i) => (
            <Link
              href={`/insights/${a.slug}`}
              key={a.slug}
              className="article-card"
            >
              <Media
                src={[images.garment, images.fabric, images.shirts][i]}
                alt="Illustrative textile editorial image"
              />
              <span className="eyebrow">{a.tag} · BRIEF GUIDE</span>
              <h3>{a.title}</h3>
              <span className="text-link">
                Read the guide <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
