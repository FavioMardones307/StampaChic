import { getProduct, products } from "@/data/products";
import { formatCLP } from "@/lib/format";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Producto StampaChic";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return renderOg({
    title: p?.name ?? "StampaChic",
    subtitle: p ? `${p.short}` : "Estampados personalizados",
    badge: p ? formatCLP(p.price) : undefined,
  });
}
