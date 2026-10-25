import Link from "next/link";
import { categories } from "@/data/products";
import { Mockup } from "@/components/product/Mockup";
import { PackMockup } from "@/components/product/Mockup";
import { Container, SectionHeading } from "@/components/ui/Section";

export function Categories() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="categorias">
      <Container>
        <SectionHeading title={<span id="categorias">¿Qué quieres estampar hoy?</span>} intro="Elige la base y nosotras le ponemos tu sello." />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((c, i) => {
            const featured = c.slug === "packs";
            return (
              <li key={c.slug} className={featured ? "col-span-2 lg:row-span-2" : ""}>
                <Link
                  href={`/tienda?categoria=${c.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] transition-shadow hover:shadow-[var(--shadow-alta)]"
                  style={{ background: c.tint }}
                >
                  <div className={`${featured ? "aspect-[2/1] lg:aspect-auto lg:flex-1" : "aspect-square"} relative`}>
                    {featured ? (
                      <PackMockup items={["tote", "cosmetiquero", "botella"]} background={c.tint} text="TENS" className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <Mockup kind={c.mockup} background={c.tint} seed={i + 2} className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" title={c.name} />
                    )}
                  </div>
                  <div className="relative px-4 pb-4 pt-1 sm:px-5 sm:pb-5">
                    <h3 className={`font-display font-bold ${featured ? "text-3xl sm:text-4xl" : "text-lg sm:text-xl"}`}>{c.name}</h3>
                    <p className="mt-0.5 text-sm text-tinta-suave">{c.blurb}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
