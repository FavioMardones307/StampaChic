import Link from "next/link";
import { getProduct, products } from "@/data/products";
import { formatCLP } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Splash } from "@/components/ui/Splash";
import { ProductVisual } from "@/components/product/ProductVisual";

const OCCASIONS = [
  { label: "Día del TENS", href: "/producto/pack-dia-del-tens" },
  { label: "Día del Profesor", href: "/producto/pack-dia-del-profesor" },
  { label: "Navidad", href: "/producto/pack-navidad-en-familia" },
  { label: "Cumpleaños", href: "/producto/pack-cumpleanero" },
];

export function PacksBanner() {
  const star = getProduct("pack-dia-del-tens")!;
  const others = products.filter((p) => p.tags.includes("pack") && p.slug !== star.slug);
  return (
    <section className="relative overflow-hidden bg-tinta py-16 text-white sm:py-24" aria-labelledby="packs">
      <Splash seed={17} color="var(--color-magenta)" opacity={0.25} className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 id="packs" className="font-display text-[2.5rem] font-bold sm:text-6xl">
              Regalos que se recuerdan, en las fechas que importan
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
              Packs temáticos con el nombre de cada persona, listos para entregar. Perfectos para equipos, cursos y familias.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {OCCASIONS.map((o) => (
                <li key={o.label}>
                  <Link href={o.href} className="inline-block rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:border-amarillo hover:text-amarillo">
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {others.map((p) => (
                <Link key={p.slug} href={`/producto/${p.slug}`} className="group">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <ProductVisual product={p} sizes="150px" className="transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-tight">{p.name.replace("Pack ", "")}</p>
                  <p className="text-sm text-white/70">{formatCLP(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>

          <article className="rounded-[1.75rem] bg-papel p-3 text-tinta shadow-[var(--shadow-alta)] sm:p-4 lg:rotate-[1.5deg]">
            <Link href={`/producto/${star.slug}`} className="relative block aspect-[4/3.4] overflow-hidden rounded-[1.25rem]">
              <ProductVisual product={star} text="TENS" sizes="(min-width:1024px) 40vw, 90vw" />
              <span className="absolute left-4 top-4 rounded-full bg-amarillo px-3 py-1.5 text-xs font-bold">El más pedido</span>
            </Link>
            <div className="flex flex-col gap-4 px-2 pb-2 pt-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold">{star.name}</h3>
                <p className="mt-1 text-tinta-suave">{star.short}</p>
                <p className="mt-2 text-2xl font-bold">{formatCLP(star.price)}</p>
              </div>
              <ButtonLink href={`/producto/${star.slug}`} size="lg" className="shrink-0">
                Quiero el mío
              </ButtonLink>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
