import { MetadataRoute } from "next";
import { company } from "@/lib/data";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.NEXT_PUBLIC_LAUNCH_READY === "true"
        ? { allow: "/", disallow: "/api/" }
        : { disallow: "/" }),
    },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
