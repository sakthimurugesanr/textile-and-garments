import Link from "next/link";
import { ArrowUpRight, Check, MapPin, Mail, Phone, Clock } from "lucide-react";
import {
  company,
  images,
  services,
  processSteps,
  articles,
  products,
} from "@/lib/data";
import {
  Media,
  TextLink,
  SectionTitle,
  SampleNote,
  FAQList,
  ProductCard,
} from "./common";
import { Catalog } from "./catalog";
import { Gallery } from "./gallery";
import { QuoteForm } from "./quote-form";
const qualityChecks = [
  [
    "Incoming materials",
    "Inspect fabric and trims against approved references before cutting.",
  ],
  [
    "GSM verification",
    "Compare fabric weight with the agreed specification and tolerance.",
  ],
  [
    "Shade consistency",
    "Check color against approved lab dips or swatches and across panels.",
  ],
  ["Shrinkage", "Assess dimensional change under agreed washing conditions."],
  [
    "Measurements",
    "Check key points against the size chart and agreed tolerances.",
  ],
  [
    "Stitching",
    "Review seam construction, stitch consistency, tension and loose threads.",
  ],
  [
    "Print & embroidery",
    "Compare placement, dimensions, color and finish with the approved sample.",
  ],
  [
    "In-process inspection",
    "Identify issues during production and document corrective action.",
  ],
  [
    "Final inspection",
    "Review the completed garment for appearance, workmanship and specifications.",
  ],
  [
    "Packing verification",
    "Confirm size and color assortments, labels, quantities and carton markings.",
  ],
];
export function PageContent({ slug }: { slug: string }) {
  if (slug === "products")
    return (
      <>
        <SampleNote />
        <Catalog />
      </>
    );
  if (slug === "gallery") return <Gallery />;
  if (slug === "faq")
    return (
      <div className="reading-width">
        <FAQList />
      </div>
    );
  if (slug === "request-a-quote") return <QuoteForm />;
  if (slug === "services")
    return (
      <>
        <SampleNote>
          Editable capabilities catalog · All listed services require
          verification. In-house versus production-partner responsibility is not
          yet confirmed.
        </SampleNote>
        <div className="service-catalog">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              <span className="eyebrow">0{i + 1} / CAPABILITY</span>
              <h2>{s.name}</h2>
              <p>{s.intro}</p>
              <div>
                {s.items.slice(0, 4).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <span className="text-link">
                Explore this service <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </>
    );
  if (slug === "insights")
    return (
      <div className="article-grid">
        {articles.map((a, i) => (
          <Link
            className="article-card"
            href={`/insights/${a.slug}`}
            key={a.slug}
          >
            <Media
              src={[images.garment, images.fabric, images.shirts][i % 3]}
              alt="Illustrative textile image"
            />
            <span className="eyebrow">{a.tag} · BRIEF GUIDE</span>
            <h2>{a.title}</h2>
            <p>{a.intro}</p>
            <span className="text-link">
              Read the guide <ArrowUpRight size={17} />
            </span>
          </Link>
        ))}
      </div>
    );
  if (slug === "about")
    return (
      <>
        <div className="split story">
          <Media
            src={images.fabric}
            alt="Illustrative fabric detail, not a company facility"
          />
          <div>
            <span className="eyebrow">OUR STORY · EDITABLE PROFILE</span>
            <h2>
              A shared vision.
              <br />A thoughtful process.
            </h2>
            <p>
              [Company Name] is a Tiruppur-based textile and garment business
              profile for domestic and international buyers. Replace this
              introduction with the company’s verified history, operating model
              and areas of expertise.
            </p>
            <p>
              Proposed approach: start with the intended wearer, define the
              specification, develop a sample and build a clear approval record
              before production.
            </p>
            <div className="notice">
              [Year Founded] · [Founder / Leadership] · [Verified Company
              History]
            </div>
          </div>
        </div>
        <div className="values-row">
          {[
            [
              "Our mission",
              "Proposed: make the journey from garment idea to production clear and collaborative.",
            ],
            [
              "Our vision",
              "Proposed: build lasting buyer relationships through consistent communication and carefully agreed specifications.",
            ],
            [
              "Our values",
              "Proposed: attention to detail, honest capability statements, documented approvals and accountability.",
            ],
          ].map(([a, b]) => (
            <div key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <SectionTitle
          eyebrow="WORKING TOGETHER"
          title="A practical partnership."
        />
        <div className="detail-rows">
          {[
            [
              "Understand your brief",
              "Discuss your product, market, target cost and preferred timeline.",
            ],
            [
              "Develop the details",
              "Review fabrics, patterns, fit and branding through samples.",
            ],
            [
              "Agree before making",
              "Confirm specifications, responsibilities, cost and order milestones in writing.",
            ],
            [
              "Stay connected",
              "Agree communication points from procurement through dispatch.",
            ],
          ].map(([a, b], i) => (
            <div key={a}>
              <span>0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <div className="paired-features">
          <div>
            <h2>People behind the process.</h2>
            <p>
              [Leadership Name & Role] · [Sampling Lead] · [Production Lead] ·
              [Quality Contact]
            </p>
            <p>
              Add approved team biographies and photographs after company
              review.
            </p>
          </div>
          <div>
            <h2>Find us in Tiruppur.</h2>
            <p>
              {company.address}
              <br />
              {company.location}
            </p>
            <TextLink href="/contact">Plan a conversation</TextLink>
          </div>
        </div>
      </>
    );
  if (slug === "fabrics")
    return (
      <>
        <div className="split material-intro">
          <div>
            <span className="eyebrow">UNDERSTANDING YOUR FABRIC</span>
            <h2>What does GSM mean?</h2>
            <p>
              GSM is grams per square metre: the weight of a measured area of
              fabric. A higher number usually means a heavier fabric, but
              quality also depends on yarn, construction, composition and
              finishing.
            </p>
            <p>
              Review a physical swatch and a garment sample. The right fabric
              should suit your fit, climate, intended use and care requirements.
            </p>
            <TextLink href="/insights/choosing-t-shirt-gsm">
              Read our GSM guide
            </TextLink>
          </div>
          <Media
            src={images.fabric}
            alt="Illustrative fabric composition and texture"
          />
        </div>
        <SampleNote>
          Material options are illustrative. Organic cotton and recycled fibers
          must only be offered with verified sourcing and supporting
          documentation.
        </SampleNote>
        <div className="material-grid">
          {[
            [
              "Cotton",
              "A familiar, absorbent handle for everyday essentials.",
              "T-shirts, babywear and casual garments.",
              "Jersey, rib, interlock and piqué.",
              "Review shrinkage, shade and wash care.",
            ],
            [
              "Cotton blends",
              "Balance cotton handle with other fiber characteristics.",
              "Polos, sweatshirts and workwear.",
              "Jersey, piqué, fleece and French terry.",
              "Confirm blend ratio, pilling and dimensional stability.",
            ],
            [
              "Polyester",
              "Useful where drying behavior and shape retention matter.",
              "Activewear, teamwear and uniforms.",
              "Performance knits and woven structures.",
              "Review colorfastness, print suitability and heat exposure.",
            ],
            [
              "Viscose",
              "A soft handle and fluid drape.",
              "Tops, lounge garments and relaxed silhouettes.",
              "Jersey and blended knit structures.",
              "Assess wet strength, shrinkage and recommended care.",
            ],
            [
              "Elastane blends",
              "Stretch and recovery alongside a base fiber.",
              "Leggings, fitted tops and stretch garments.",
              "Stretch jersey, rib and interlock.",
              "Agree stretch, recovery, heat sensitivity and care.",
            ],
            [
              "Linen blends",
              "A textured appearance and distinctive handle.",
              "Light garments, home textiles and relaxed pieces.",
              "Woven structures and selected knits.",
              "Review creasing, shade variation and shrinkage.",
            ],
          ].map(([name, feel, use, structure, test], i) => (
            <article className="material-card" key={name}>
              <span className={`material-chip swatch-${i % 4}`} />
              <h2>{name}</h2>
              <p>{feel}</p>
              <dl>
                <dt>Suitable applications</dt>
                <dd>{use}</dd>
                <dt>Structures to discuss</dt>
                <dd>{structure}</dd>
                <dt>Development & care</dt>
                <dd>
                  {test} Composition, GSM, colors and finishes require sample
                  approval.
                </dd>
              </dl>
            </article>
          ))}
        </div>
      </>
    );
  if (slug === "manufacturing-process")
    return (
      <>
        <SampleNote>
          Illustrative workflow · Steps and responsibility vary by product.
          Confirm in-house and partner operations before order agreement.
        </SampleNote>
        <div className="timeline">
          {processSteps.map((s, i) => (
            <article key={s} data-reveal>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2>{s}</h2>
                <p>
                  {
                    [
                      "Share your product idea, quantities, destination and preferred delivery date.",
                      "Review drawings, measurements, construction and performance expectations. Buyer confirms the development brief.",
                      "Discuss fabric composition, structure, weight, trims and color references. Buyer approves material direction.",
                      "Develop prototypes, fit or size-set samples as needed. Review sample charges and revisions in advance.",
                      "Buyer approves fit, measurements, fabric, artwork, labels and construction in writing.",
                      "Agree cost, payment terms, scope, quantities and schedule before committing the order.",
                      "Source materials and trims against the approved specifications.",
                      "Produce or source fabric through the agreed in-house or partner arrangement.",
                      "Review lab dips, strike-offs and finishing references. Buyer approves relevant colors and decoration.",
                      "Cut approved fabric using the agreed patterns and size breakdown.",
                      "Assemble garments to the approved construction and monitor workmanship.",
                      "Check materials, measurements, stitching, decoration and final appearance against agreed references.",
                      "Verify labels, assortments, folding, packaging and packing lists. Buyer approves packing requirements.",
                      "Coordinate handover and shipment updates under the agreed delivery arrangement.",
                    ][i]
                  }
                </p>
                {[1, 2, 4, 5, 8, 12].includes(i) && (
                  <span className="approval">
                    <Check size={13} /> BUYER APPROVAL / CONFIRMATION
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </>
    );
  if (slug === "infrastructure")
    return (
      <>
        <Media
          src={images.factory}
          alt="AI-generated fabric workshop concept; not the company factory"
          className="wide-image"
        />
        <SampleNote>
          Illustrative department map, not a verified facility inventory.
          [Machinery List] · [Production Capacity] · [Floor Area] · [Employee
          Count]. Confirm which operations are in-house and which use production
          partners.
        </SampleNote>
        <div className="detail-rows">
          {[
            [
              "Sampling unit",
              "Patterns, prototypes, fit development and approval references.",
            ],
            [
              "Cutting department",
              "Fabric preparation, marker planning and cutting to agreed patterns.",
            ],
            [
              "Sewing lines",
              "Garment assembly using construction appropriate to the product.",
            ],
            [
              "Printing & embroidery",
              "Technique availability and in-house or partner status: [Confirm].",
            ],
            [
              "Finishing area",
              "Thread trimming, pressing and appearance review.",
            ],
            [
              "Inspection area",
              "Measurement, workmanship and final inspection against specifications.",
            ],
            [
              "Packing area",
              "Label checks, folding, assortments and carton preparation.",
            ],
            [
              "Storage & dispatch",
              "Material and finished goods storage; coordinated order handover.",
            ],
          ].map(([a, b], i) => (
            <div key={a}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{a}</h3>
              <p>
                {b}
                <small>
                  Facility and equipment details: [Confirm with company]
                </small>
              </p>
            </div>
          ))}
        </div>
      </>
    );
  if (slug === "quality")
    return (
      <>
        <div className="split material-intro">
          <div>
            <h2>Start with a shared reference.</h2>
            <p>
              Define the sample, specifications and tolerances before
              production. An agreed quality plan creates a practical reference
              for what to check and how to resolve differences.
            </p>
            <p>
              Inspection methods and any external tests must be confirmed for
              the specific product. This website makes no certification or
              laboratory accreditation claims.
            </p>
          </div>
          <Media
            src={images.textile}
            alt="Illustrative clothing detail for quality discussion"
          />
        </div>
        <div className="detail-rows">
          {qualityChecks.map(([a, b], i) => (
            <div key={a}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <SampleNote>
          Proposed inspection framework. Confirm the actual quality workflow,
          testing providers and agreed standards before launch.
        </SampleNote>
      </>
    );
  if (slug === "sustainability")
    return (
      <>
        <div className="sustain-intro">
          <span className="eyebrow">TRANSPARENCY BEFORE CLAIMS</span>
          <h2>Progress needs evidence.</h2>
          <p>
            The company has not supplied verified environmental or social
            performance data. These proposed initiatives describe areas to
            investigate, implement and document. No certification, emissions,
            water savings or labor compliance claims are implied.
          </p>
        </div>
        <div className="detail-rows">
          {[
            [
              "Responsible material sourcing",
              "Evaluate material origins, supplier documentation and product suitability.",
            ],
            [
              "Fabric waste reduction",
              "Review marker planning, offcut segregation and documented recovery routes.",
            ],
            [
              "Packaging reduction",
              "Assess necessary protection, material choices and buyer-approved reductions.",
            ],
            [
              "Energy management",
              "Establish energy-use records and identify practical efficiency opportunities.",
            ],
            [
              "Water management",
              "Review water use and processing-partner evidence where wet processing is involved.",
            ],
            [
              "Supplier evaluation",
              "Document supplier selection criteria, responsibilities and review processes.",
            ],
            [
              "Worker welfare",
              "Review workplace policies, training, safety and grievance procedures with supporting records.",
            ],
          ].map(([a, b], i) => (
            <div key={a}>
              <span>0{i + 1}</span>
              <h3>
                {a}
                <small>PROPOSED INITIATIVE</small>
              </h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <SampleNote>
          Publish certifications only after validating the certificate holder,
          scope, validity and permission to use the logo.
        </SampleNote>
      </>
    );
  if (slug === "private-label")
    return (
      <>
        <div className="split material-intro">
          <Media
            src={images.shirts}
            alt="Illustrative garments for a private label collection"
          />
          <div>
            <span className="eyebrow">A COLLECTION THAT FEELS LIKE YOU</span>
            <h2>
              From your first idea
              <br />
              to your own label.
            </h2>
            <p>
              Private label means garments made and branded for your business.
              OEM, or original equipment manufacturing, typically means
              producing to your supplied design and specifications.
            </p>
            <p>
              Both approaches require agreed product details, samples and
              approvals. They can suit new labels, established brands, retailers
              and corporate buyers.
            </p>
          </div>
        </div>
        <div className="values-row">
          {[
            [
              "01 / Define",
              "Choose your audience, product range, target quantities, price direction and intended launch.",
            ],
            [
              "02 / Develop",
              "Review fabrics, tech packs, patterns, fit and size-set samples. Agree sample charges and revision scope.",
            ],
            [
              "03 / Approve",
              "Sign off the product, artwork, labels, packaging and commercial terms before bulk production.",
            ],
          ].map(([a, b]) => (
            <div key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <div className="split">
          <div>
            <h2>
              Bring the brief.
              <br />
              Build the details.
            </h2>
            <p>
              Share sketches or a tech pack, size chart, quantity by color and
              size, fabric preferences, brand artwork and delivery requirements.
            </p>
            <p>
              Repeat orders should reference an approved specification and
              sample. Fabric availability, shades, price and lead times are
              reviewed again.
            </p>
          </div>
          <div>
            <h3>Branding & packaging options</h3>
            <ul className="check-list">
              {services[6].items.map((x) => (
                <li key={x}>
                  <Check size={16} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SampleNote />
        <div className="section-heading">
          <h2>Before your first collection.</h2>
        </div>
        <FAQList limit={6} />
      </>
    );
  if (slug === "exports")
    return (
      <>
        <div className="split material-intro">
          <div>
            <h2>
              Plan the handover.
              <br />
              Keep the details clear.
            </h2>
            <p>
              Domestic and international inquiries start with the same
              essentials: an approved product brief, destination, quantity and
              required documents.
            </p>
            <p>
              No export destinations or shipment achievements have been
              supplied. Confirm actual service coverage and the roles of the
              company, buyer and freight forwarder before order confirmation.
            </p>
            <div className="notice">
              Confirmed destinations: [Add verified information]
            </div>
          </div>
          <Media
            src={images.shirts}
            alt="Illustrative garment presentation before packing"
          />
        </div>
        <div className="detail-rows">
          {[
            [
              "Export packing",
              "Agree garment protection, assortments, carton specifications and markings.",
            ],
            [
              "Documentation coordination",
              "Confirm the required invoice, packing list and other documents with the relevant parties.",
            ],
            [
              "Shipping coordination",
              "Align the ready date, collection information and forwarder handover.",
            ],
            [
              "Buyer communication",
              "Agree milestone updates, approval responsibilities and a named contact.",
            ],
            [
              "Tracking support",
              "Share available shipment references following confirmed dispatch.",
            ],
          ].map(([a, b], i) => (
            <div key={a}>
              <span>0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <SampleNote>
          Shipment terms are subject to agreement. Customs clearance, particular
          Incoterms, destination compliance and delivery dates are not promised.
        </SampleNote>
      </>
    );
  if (slug === "contact")
    return (
      <>
        <div className="contact-grid">
          <div>
            <MapPin />
            <h3>Visit us</h3>
            <p>
              {company.address}
              <br />
              {company.location}
            </p>
          </div>
          <div>
            <Mail />
            <h3>Write to us</h3>
            <ContactLink kind="email" />
            <p>Replace with a verified business email.</p>
          </div>
          <div>
            <Phone />
            <h3>Let’s talk</h3>
            <ContactLink kind="phone" />
            <ContactLink kind="whatsapp" />
          </div>
          <div>
            <Clock />
            <h3>Business hours</h3>
            <p>
              {company.hours}
              <br />
              Confirm availability before visiting.
            </p>
          </div>
        </div>
        <div className="map-placeholder">
          <MapPin size={32} />
          <h3>Your factory location belongs here.</h3>
          <p>
            Add the verified factory address and approved map integration before
            launch.
          </p>
          <a
            className="text-link"
            href="https://www.google.com/maps/search/?api=1&query=Tiruppur%2C%20Tamil%20Nadu%2C%20India"
            target="_blank"
            rel="noreferrer"
          >
            Explore Tiruppur on Maps <ArrowUpRight size={16} />
          </a>
          <span className="mini">
            City reference only · Not factory directions
          </span>
        </div>
        <QuoteForm contact />
      </>
    );
  if (slug === "privacy")
    return (
      <Legal
        sections={[
          [
            "Who we are",
            `[Company Name], [Legal Entity], ${company.address}, Tiruppur, Tamil Nadu, India. Privacy contact: ${company.email}. Replace these details before accepting inquiries.`,
          ],
          [
            "Information you provide",
            "A configured inquiry form may collect your contact details, company information, product requirements and reference files. In current demo mode, submissions are validated and rejected with an explicit notice; they are not delivered or stored as business inquiries. Hosting providers may retain operational request logs.",
          ],
          [
            "Purpose and sharing",
            "The intended purpose is to respond to buyer inquiries and prepare quotations. Before activation, identify the delivery, storage and hosting processors, their locations and the applicable basis for processing. Do not use inquiry details for unrelated marketing without the required permission.",
          ],
          [
            "Browser storage",
            "The inquiry list uses local browser storage to remember selected product references. It contains product identifiers rather than contact details. Remove individual products from the quote page or clear site data in your browser. No analytics or advertising scripts are included. Remote stock images may make requests to the image provider or the hosting image service.",
          ],
          [
            "Retention and rights",
            "[Retention Period] and [Rights Request Process] must be set by the company according to applicable requirements. Explain correction, deletion and complaint procedures and name the appropriate contact before launch.",
          ],
          [
            "Security and changes",
            "Restrict access to inquiries, protect provider credentials and review file handling before enabling delivery. Record the policy review date here: [Review Date].",
          ],
        ]}
      />
    );
  if (slug === "terms")
    return (
      <Legal
        sections={[
          [
            "Website information",
            "This preview uses editable company placeholders, sample products and illustrative stock photographs. Capability availability and operational details must be verified directly before relying on them.",
          ],
          [
            "Inquiries and quotations",
            "Catalog entries are invitations to discuss requirements, not binding offers. Minimum quantities, prices, payment terms, samples, lead times and shipping terms depend on written confirmation. No checkout or payment facility is provided.",
          ],
          [
            "Specifications and approvals",
            "A confirmed order should define product specifications, tolerances, artwork, quantities, approval responsibilities and change procedures. Sampling or production starts only under the agreed commercial arrangement.",
          ],
          [
            "Artwork and reference files",
            "Only share files you are entitled to provide. Agree intellectual property, confidentiality and permitted use of buyer artwork in the order contract. The demo form does not retain attachments.",
          ],
          [
            "Delivery and responsibility",
            "Shipment arrangements, documentation, acceptance criteria and any remedies must be specified in the order agreement. The website provides no guaranteed delivery dates or destination compliance commitments.",
          ],
          [
            "Company review required",
            "Add the verified legal entity, governing terms, jurisdiction, dispute process and contact details after appropriate company review. [Effective Date] · [Legal Entity] · [Contact Details].",
          ],
        ]}
      />
    );
  return null;
}
function Legal({ sections }: { sections: string[][] }) {
  return (
    <article className="reading-width legal-copy">
      {sections.map(([title, body]) => (
        <section key={title}>
          <h2>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
    </article>
  );
}
function ContactLink({ kind }: { kind: "email" | "phone" | "whatsapp" }) {
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL;
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE;
  const raw = kind === "email" ? email : phone;
  const href =
    kind === "email"
      ? `mailto:${raw}`
      : kind === "phone"
        ? `tel:${raw}`
        : `https://wa.me/${raw?.replace(/\D/g, "")}`;
  return raw ? (
    <a className="text-link" href={href}>
      {kind === "whatsapp" ? "WhatsApp" : raw}
      <ArrowUpRight size={14} />
    </a>
  ) : (
    <p>
      {kind === "email"
        ? company.email
        : kind === "phone"
          ? company.phone
          : "WhatsApp: [Phone Number]"}{" "}
      <small>Awaiting verified contact details</small>
    </p>
  );
}
export function RelatedProducts() {
  return (
    <section className="related-products">
      <SectionTitle
        eyebrow="EXPLORE THE POSSIBILITIES"
        title="Products to start a conversation."
        href="/products"
        link="View all products"
      />
      <div className="product-grid">
        {products.slice(0, 3).map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
