import Link from "next/link";
import { categories } from "@/data/products";
import { Mockup, PackMockup } from "@/components/product/Mockup";
import { IconArrowRight } from "@/components/ui/Icons";
import { Container, SectionHeading } from "@/components/ui/Section";

export function Categories() {
  const list = categories;
  return (
    <section className="py-16 sm:py-24" aria-labelledby="categorias">
      <Container>
        <SectionHeading title={<span id="categorias">¿Qué quieres estampar hoy?</span>} intro="Elige la base y nosotras le ponemos tu sello." />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {list.map((c, i) => {
            const featured = c.slug === "packs";
            return (
              <li key={c.slug} className={featured ? "col-span-2 lg:row-span-2" : ""}>
                <Link
                  href={`/tienda?categoria=${c.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.5rem] ${featured ? "bg-tinta text-white" : "bg-algodon"}`}
                >
                  <div className={featured ? "aspect-[4/3] lg:aspect-square" : "aspect-square"}>
                    {featured ? (
                      <PackMockup items={["tote", "cosmetiquero", "botella"]} background="#17131c" text="TENS" className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <Mockup kind={c.mockup} background="#F1F1F3" seed={i + 2} className="h-full w-full transition-transform duration-500 group-hover:scale-105" title={c.name} />
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                    <div>
                      <h3 className={`font-display font-semibold ${featured ? "text-3xl sm:text-4xl" : "text-lg sm:text-xl"}`}>{c.name}</h3>
                      {featured && <p className="mt-1 text-white/70">{c.blurb}</p>}
                    </div>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${featured ? "bg-magenta text-white" : "bg-white text-tinta group-hover:bg-magenta group-hover:text-white"}`}
                      aria-hidden
                    >
                      <IconArrowRight className="h-4 w-4" />
                    </span>
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
