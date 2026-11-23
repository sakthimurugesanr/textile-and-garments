import { MetadataRoute } from "next";
import {
  company,
  pageInfo,
  products,
  categories,
  services,
  articles,
} from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    ...Object.keys(pageInfo),
    ...products.map((p) => `products/${p.slug}`),
    ...categories.map((c) => `products/category/${c.slug}`),
    ...services.map((s) => `services/${s.slug}`),
    ...articles.map((a) => `insights/${a.slug}`),
  ].map((path) => ({
    url: `${company.url}/${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.6 : 1,
  }));
}
