import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, getRelated, products } from "@/data/products";
import { formatCLP } from "@/lib/format";
import { JsonLd, productLd } from "@/lib/seo";
import { Container } from "@/components/ui/Section";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetail } from "@/components/product/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const description = `${p.short} ${formatCLP(p.price)}. Hecho a mano en Machalí, envíos a todo Chile.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: `/producto/${p.slug}` },
    openGraph: { title: `${p.name} | StampaChic`, description, url: `/producto/${p.slug}`, type: "website" },
    twitter: { title: `${p.name} | StampaChic`, description },
  };
}

export default async function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.categories[0]);
  const related = getRelated(product);

  return (
    <>
      <Container className="pb-16 pt-6 sm:pt-8">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-tinta-suave">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-tinta hover:underline">Inicio</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/tienda" className="hover:text-tinta hover:underline">Tienda</Link></li>
            {category && (
              <>
                <li aria-hidden>/</li>
                <li><Link href={`/tienda?categoria=${category.slug}`} className="hover:text-tinta hover:underline">{category.name}</Link></li>
              </>
            )}
          </ol>
        </nav>
        <ProductDetail product={product} />
      </Container>

      <section className="border-t border-linea bg-white py-16" aria-labelledby="relacionados">
        <Container>
          <h2 id="relacionados" className="font-display text-3xl font-bold sm:text-4xl">También te puede gustar</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}><ProductCard product={p} /></li>
            ))}
          </ul>
        </Container>
      </section>
      <JsonLd data={productLd(product)} />
    </>
  );
}
