import { createElement } from "react";
import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Product } from "@/data/products";

/** Inserta datos estructurados (JSON-LD) para Google. */
export function JsonLd({ data }: { data: object }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.name,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}/opengraph-image`,
    telephone: `+${site.contact.whatsapp}`,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: "CL",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.location.lat, longitude: site.location.lng },
    areaServed: "CL",
    priceRange: "$$",
    sameAs: [site.social.instagram],
  };
}

export function productLd(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description.join(" "),
    sku: p.slug,
    brand: { "@type": "Brand", name: site.name },
    image: p.images.length ? p.images.map((i) => `${site.url}${i}`) : [`${site.url}/producto/${p.slug}/opengraph-image`],
    url: `${site.url}/producto/${p.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "CLP",
      price: p.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
    },
  };
}

/** Metadatos estándar para páginas internas */
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
    twitter: { title: `${title} | ${site.name}`, description },
  };
}
