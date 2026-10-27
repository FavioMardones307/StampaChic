import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  if (site.comingSoon.enabled) return [{ url: site.url, changeFrequency: "weekly", priority: 1 }];
  const pages = ["", "/tienda", "/personaliza", "/estampa-bar", "/empresas", "/nosotros", "/contacto", "/faq", "/envios", "/cambios-y-devoluciones", "/terminos"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${site.url}/producto/${p.slug}`, lastModified: p.createdAt, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
