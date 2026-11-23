export const company = {
  name: "[Company Name]",
  email: "[Email Address]",
  phone: "[Phone Number]",
  address: "[Factory Address]",
  location: "Tiruppur, Tamil Nadu, India",
  hours: "[Business Hours]",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
export const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;
export const images = {
  hero: "/images/textile-hero.jpg",
  fabric: "/images/textile-hero.jpg",
  garment: "/images/tshirt.jpg",
  fashion: "/images/textile.jpg",
  factory: "/images/textile-hero.jpg",
  shirts: "/images/shirts.jpg",
  textile: "/images/textile.jpg",
};
export const categories = [
  {
    slug: "men",
    name: "Men",
    description: "Everyday essentials. Thoughtfully constructed.",
    image: images.garment,
  },
  {
    slug: "women",
    name: "Women",
    description: "Versatile silhouettes for modern collections.",
    image: images.fashion,
  },
  {
    slug: "kids-and-babies",
    name: "Kids & babies",
    description: "Comfort considered in every little detail.",
    image: "/images/kids.jpg",
  },
  {
    slug: "business-and-institutional",
    name: "Business & institutional",
    description: "A consistent identity, made to your brief.",
    image: images.textile,
  },
  {
    slug: "home-textiles",
    name: "Home textiles",
    description: "Considered fabrics for everyday spaces.",
    image: images.fabric,
  },
];
export type Product = {
  slug: string;
  name: string;
  category: string;
  fabric: string;
  fit: string;
  image: string;
  code: string;
  gsm: string;
};
const rows = [
  ["Round-neck T-shirt", "men", "Cotton", "Regular"],
  ["Polo shirt", "men", "Cotton blend", "Regular"],
  ["Oversized T-shirt", "men", "Cotton", "Relaxed"],
  ["Sweatshirt", "men", "Cotton blend", "Relaxed"],
  ["Hoodie", "men", "Cotton blend", "Relaxed"],
  ["Joggers", "men", "Cotton blend", "Regular"],
  ["Shorts", "men", "Cotton", "Regular"],
  ["Activewear T-shirt", "men", "Polyester", "Regular"],
  ["Everyday T-shirt", "women", "Cotton", "Regular"],
  ["Jersey top", "women", "Viscose", "Relaxed"],
  ["Leggings", "women", "Elastane blend", "Fitted"],
  ["Lounge set", "women", "Cotton blend", "Relaxed"],
  ["Relaxed sweatshirt", "women", "Cotton blend", "Relaxed"],
  ["Zip hoodie", "women", "Cotton blend", "Regular"],
  ["Activewear top", "women", "Polyester", "Fitted"],
  ["Kids T-shirt", "kids-and-babies", "Cotton", "Regular"],
  ["Shorts and set", "kids-and-babies", "Cotton", "Regular"],
  ["Babywear set", "kids-and-babies", "Cotton", "Regular"],
  ["Romper", "kids-and-babies", "Cotton", "Regular"],
  ["Sleepwear", "kids-and-babies", "Cotton", "Relaxed"],
  ["Corporate polo", "business-and-institutional", "Cotton blend", "Regular"],
  ["Promotional T-shirt", "business-and-institutional", "Cotton", "Regular"],
  ["Workwear shirt", "business-and-institutional", "Cotton blend", "Regular"],
  [
    "School and college uniform",
    "business-and-institutional",
    "Cotton blend",
    "Regular",
  ],
  ["Hospitality uniform", "business-and-institutional", "Polyester", "Regular"],
  ["Teamwear jersey", "business-and-institutional", "Polyester", "Regular"],
  ["Bath towel", "home-textiles", "Cotton", "Not applicable"],
  ["Bed linen", "home-textiles", "Cotton", "Not applicable"],
  ["Cushion cover", "home-textiles", "Linen blend", "Not applicable"],
];
export const products: Product[] = rows.map(
  ([name, category, fabric, fit], i) => ({
    slug: name.toLowerCase().replaceAll(" ", "-"),
    name,
    category,
    fabric,
    fit,
    image:
      category === "kids-and-babies"
        ? "/images/kids.jpg"
        : category === "women"
          ? images.fashion
          : category === "home-textiles"
            ? images.fabric
            : i % 3 === 0
              ? images.garment
              : images.shirts,
    code: `TG-${String(i + 1).padStart(3, "0")}`,
    gsm:
      category === "home-textiles"
        ? "Defined by product construction"
        : "160–240 GSM, subject to development",
  }),
);
const serviceRows = [
  [
    "product-development",
    "Product development",
    "Design consultation|Tech pack review and assistance|Fabric and trim sourcing|Pattern making|Size grading|Prototype development|Fit samples|Size-set samples|Pre-production samples|Sample revisions and approval",
    "Review fit, measurements, construction and sample comments against the approved tech pack.",
    "Sketches, a tech pack, reference garments, target size chart and intended use.",
  ],
  [
    "fabric-development",
    "Fabric development & sourcing",
    "Yarn sourcing|Knitted fabric development|Woven fabric sourcing|Composition and GSM selection|Color matching|Lab dips|Fabric testing coordination|Specialty fabric sourcing",
    "Agree composition, weight, shade, shrinkage and testing requirements before procurement.",
    "Composition, GSM, hand feel, swatches, colors and testing needs.",
  ],
  [
    "knitting-and-weaving",
    "Knitting & weaving",
    "Single jersey|Rib|Interlock|Piqué|Fleece|French terry|Woven fabric options where available",
    "Review structure, width, weight, surface defects and dimensional stability.",
    "Construction references, fabric weight, required width and end use.",
  ],
  [
    "dyeing-and-processing",
    "Dyeing & fabric processing",
    "Fabric dyeing|Yarn dyeing|Bleaching|Washing|Compacting|Heat setting where applicable|Softening and finishing|Shrinkage control|Color consistency checks",
    "Approve lab dips and assess shade variation, shrinkage and finish before bulk processing.",
    "Color references, approved swatches and required wash or finish.",
  ],
  [
    "printing-and-embellishment",
    "Printing & embellishment",
    "Screen printing|Digital textile printing|Sublimation for suitable fabrics|Heat transfer printing|Embroidery|Appliqué|Patches and badges",
    "Approve strike-offs or embroidery samples; check placement, color, adhesion and appearance.",
    "Vector artwork, dimensions, placement, color references and expected wash performance.",
  ],
  [
    "garment-manufacturing",
    "Garment manufacturing",
    "Fabric inspection|Cutting|Sewing and stitching|Overlocking|Flatlock stitching|Assembly|Measurement checks|Finishing|Pressing|Final inspection",
    "Check measurements, seam construction, appearance and workmanship during and after sewing.",
    "Approved sample, tech pack, size breakdown and order quantities.",
  ],
  [
    "private-label-and-oem",
    "Private label & OEM",
    "Custom garment manufacturing|Brand labels|Neck labels|Care and composition labels|Hang tags|Barcode labels|Custom packaging|Collection development|Bulk production|Repeat order support",
    "Approve label copy, placement, barcode artwork, packaging and a pre-production sample.",
    "Brand artwork, labeling requirements, product specifications and collection plan.",
  ],
  [
    "packaging-and-dispatch",
    "Packaging & dispatch",
    "Individual garment packing|Buyer-specific folding|Size and color assortment|Carton packing|Carton labeling|Packing lists|Dispatch coordination",
    "Verify assortments, piece counts, labels, carton condition and packing lists.",
    "Folding guidelines, pack ratios, carton limits, labeling and delivery details.",
  ],
  [
    "export-support",
    "Export support",
    "Buyer specification coordination|Export packaging|Documentation coordination|Freight forwarder coordination|Shipment tracking support|Shipment terms subject to agreement",
    "Review agreed documentation, packing information and handover details with the buyer and forwarder.",
    "Destination, consignee details, documentation needs and proposed shipment arrangement.",
  ],
];
export const services = serviceRows.map(
  ([slug, name, items, checks, inputs]) => ({
    slug,
    name,
    items: items.split("|"),
    checks,
    inputs,
    intro: `Explore ${name.toLowerCase()} around your product brief, with specifications and approvals agreed before production.`,
  }),
);
export const processSteps = [
  "Buyer inquiry",
  "Requirements & tech pack review",
  "Fabric & trim selection",
  "Sampling",
  "Sample approval",
  "Costing & order confirmation",
  "Material procurement",
  "Fabric production or sourcing",
  "Dyeing, printing & finishing",
  "Cutting",
  "Sewing",
  "Quality inspection",
  "Packing",
  "Dispatch",
];
export const faqs = [
  [
    "What is your minimum order quantity?",
    "MOQ depends on the product, fabric, color breakdown and customization. Share your requirements so the team can confirm a workable minimum.",
  ],
  [
    "Can I request a sample? Are there sample charges?",
    "Sampling, revisions, charges and timing are confirmed after reviewing your design. Approve the sample before bulk production begins.",
  ],
  [
    "Can you manufacture my own designs?",
    "Share a tech pack, sketches or reference garment. Construction, fabric and branding requirements are reviewed before feasibility is confirmed.",
  ],
  [
    "Which fabrics and sizes can I choose?",
    "The sample catalog includes cotton, blends and other materials. Fabric availability, grading and size ranges are agreed for each order.",
  ],
  [
    "Do you offer printing and embroidery?",
    "Techniques depend on fabric and artwork. Availability and the use of in-house facilities or production partners must be confirmed.",
  ],
  [
    "Can you add my brand labels and packaging?",
    "Options may include neck labels, care labels, hang tags and custom packaging. Artwork and specifications require approval.",
  ],
  [
    "How long does production take?",
    "Lead time depends on specifications, material availability, approvals and order volume. A schedule is agreed after reviewing the brief.",
  ],
  [
    "What are your payment terms?",
    "Pricing, deposits, balances and payment methods are confirmed in the written quotation and order agreement.",
  ],
  [
    "Do you support domestic delivery and export inquiries?",
    "Both domestic and international inquiries are welcome. Delivery destinations, documentation and shipment terms are subject to confirmation.",
  ],
  [
    "Can I place a repeat order?",
    "Share the previous reference and any changes. Materials, shades, quantities, pricing and timing are reviewed before confirmation.",
  ],
  [
    "How is quality checked?",
    "An agreed inspection plan can cover incoming materials, fabric weight, shade, shrinkage, measurements, stitching, embellishments and packing.",
  ],
  [
    "How should I prepare a bulk inquiry?",
    "Include product references, fabric preference, quantities by size and color, artwork, packaging instructions and a preferred delivery date.",
  ],
];
export const articles = [
  {
    slug: "choosing-t-shirt-gsm",
    title: "A practical guide to choosing T-shirt GSM",
    tag: "Fabric knowledge",
    intro:
      "A heavier fabric is not automatically a better fabric. Start with how the garment will be worn.",
    sections: [
      [
        "What GSM tells you",
        "GSM means grams per square metre: the weight of a measured area of fabric. It describes substance, but does not tell the whole story about softness, durability or quality.",
      ],
      [
        "Match weight to purpose",
        "Lightweight jerseys can suit warm-weather layering. Midweight constructions offer an everyday balance, while heavier jerseys support a more structured silhouette. Evaluate swatches and samples alongside the number.",
      ],
      [
        "Approve a complete specification",
        "Compare composition, knit structure, shrinkage, hand feel and opacity. Record an agreed tolerance and check the finished fabric after processing.",
      ],
    ],
  },
  {
    slug: "cotton-versus-blends",
    title: "Cotton or a cotton blend? Start with the end use.",
    tag: "Materials",
    intro:
      "Composition changes how a garment feels, moves and behaves after washing.",
    sections: [
      [
        "Understanding cotton",
        "Cotton offers a familiar handle and moisture absorption. Knit structure, yarn quality and finishing influence the result.",
      ],
      [
        "Why consider a blend?",
        "Polyester changes drying behavior and stability. Elastane adds stretch and recovery. Viscose alters drape. Select a composition for the intended application.",
      ],
      [
        "Test before you commit",
        "Review shrinkage, pilling, colorfastness and care requirements using the proposed finished fabric. Agree composition labeling after verification.",
      ],
    ],
  },
  {
    slug: "private-label-manufacturing",
    title: "From an idea to your own clothing label",
    tag: "Buyer guide",
    intro:
      "The decisions between your first sketch and an approved production sample.",
    sections: [
      [
        "Define the collection",
        "Choose an audience, product types, target price and planned quantities. A focused first collection makes development decisions easier.",
      ],
      [
        "Develop and approve",
        "Source fabrics and review fit samples. Approve construction, grading, labels, artwork and packaging before bulk production.",
      ],
      [
        "Keep an approval record",
        "Maintain dated samples and written comments. Repeat orders are easier when specifications are documented.",
      ],
    ],
  },
  {
    slug: "garment-tech-pack",
    title: "What belongs in a garment tech pack?",
    tag: "Product development",
    intro:
      "Clear specifications give buyers and production teams a shared reference.",
    sections: [
      [
        "Describe the garment",
        "Include technical drawings, reference codes, composition, construction, trims and fit.",
      ],
      [
        "Make measurements usable",
        "Add size charts, diagrams, tolerances, grading instructions and artwork placement.",
      ],
      [
        "Manage revisions",
        "Number versions and record approvals. Mark changes clearly so everyone uses the agreed information.",
      ],
    ],
  },
  {
    slug: "bulk-garment-inquiry",
    title: "How to prepare a useful bulk garment inquiry",
    tag: "Buyer guide",
    intro:
      "A clear brief makes the first costing conversation more productive.",
    sections: [
      [
        "Share the essentials",
        "State the product, approximate quantity, size and color split, fabric preference and destination.",
      ],
      [
        "Explain customization",
        "List print positions, labels, packaging and testing requirements. Include artwork dimensions and color references.",
      ],
      [
        "Discuss your timeline",
        "Share your preferred date and approval availability. Confirm timing after specification review.",
      ],
    ],
  },
  {
    slug: "garment-quality-checks",
    title: "The quality checks behind a finished garment",
    tag: "Quality",
    intro:
      "Quality is a series of decisions throughout development and production.",
    sections: [
      [
        "Begin with materials",
        "Check surface defects, shade, weight and performance against approved references.",
      ],
      [
        "Check during construction",
        "Review seam quality, measurements, placement and appearance while corrections remain practical.",
      ],
      [
        "Verify the finished order",
        "Check size and color assortments, labels, packing and quantities. Agree inspection standards in advance.",
      ],
    ],
  },
];
export const pageInfo: Record<
  string,
  { title: string; eyebrow: string; intro: string }
> = Object.fromEntries(
  [
    [
      "about",
      "Rooted in Tiruppur. Built around your vision.",
      "About us",
      "A textile and garment manufacturing partner for brands, businesses and buyers seeking a considered path from fabric to finished product.",
    ],
    [
      "services",
      "Every detail. Every stage. Connected.",
      "Our capabilities",
      "Explore an editable service catalog, from your first technical conversation to a carefully packed order.",
    ],
    [
      "products",
      "Your next collection starts here.",
      "Product collection",
      "Explore sample product directions, find the right fabric and make each detail your own.",
    ],
    [
      "fabrics",
      "Good garments begin with the right fabric.",
      "Fabrics & materials",
      "Consider composition, construction and weight together. Explore the materials that could shape your collection.",
    ],
    [
      "manufacturing-process",
      "From your brief to the final box.",
      "How it comes together",
      "A transparent sequence of development, approvals and production. The workflow varies by product and agreed scope.",
    ],
    [
      "infrastructure",
      "A closer look at the making.",
      "Infrastructure",
      "Explore production departments. Facility details and the division between in-house and partner operations await company verification.",
    ],
    [
      "quality",
      "Quality is in the details.",
      "Quality assurance",
      "An inspection approach built around approved specifications, clear references and checks throughout production.",
    ],
    [
      "sustainability",
      "Better decisions, thoughtfully made.",
      "A considered approach",
      "The following proposed initiatives are areas for company review, not verified achievements.",
    ],
    [
      "private-label",
      "Your brand. Brought to life.",
      "Private label & OEM",
      "Develop your own collection around your specifications, identity and packaging.",
    ],
    [
      "exports",
      "Made for a connected world.",
      "Export & logistics",
      "Plan packing, communication and shipment coordination around your order. Arrangements are confirmed individually.",
    ],
    [
      "gallery",
      "The textures. The details. The possibilities.",
      "Visual journal",
      "Illustrative stock and AI imagery, not company facilities or confirmed products.",
    ],
    [
      "insights",
      "A little knowledge. A better product.",
      "Insights & resources",
      "Practical guides to prepare your brief and make confident product decisions.",
    ],
    [
      "faq",
      "Good questions. Clear answers.",
      "Buyer questions",
      "Final commercial terms depend on confirmed specifications and written agreement.",
    ],
    [
      "contact",
      "Let’s start a conversation.",
      "Contact us",
      "Tell us what you are working on. A clear brief helps frame the next steps.",
    ],
    [
      "request-a-quote",
      "Let’s make something together.",
      "Request a quote",
      "Share your ideas and requirements. A clear brief is the first step towards a considered quotation.",
    ],
    [
      "privacy",
      "Privacy policy",
      "Legal · draft for review",
      "This editable policy requires company review and completion before launch.",
    ],
    [
      "terms",
      "Terms & conditions",
      "Legal · draft for review",
      "These sample website terms require company review. Order-specific terms belong in the written agreement.",
    ],
  ].map(([slug, title, eyebrow, intro]) => [slug, { title, eyebrow, intro }]),
);
