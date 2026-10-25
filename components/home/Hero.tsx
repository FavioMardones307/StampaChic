import Link from "next/link";
import { getProduct } from "@/data/products";
import { formatCLP } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { Splash } from "@/components/ui/Splash";
import { ProductVisual } from "@/components/product/ProductVisual";

const COLLAGE = [
  { slug: "polera-infantil-con-nombre", label: "Polera infantil", text: "Sofía", color: "#FFFFFF", cls: "left-[2%] top-[6%] w-[58%] -rotate-[5deg] z-10" },
  { slug: "tazon-clasico-11oz", label: "Tazón", text: "Mamá", color: "#FFFFFF", cls: "right-[0%] top-[0%] w-[46%] rotate-[6deg]" },
  { slug: "tote-bag-lona", label: "Tote bag", text: "Tu Marca", color: "#1D1B20", cls: "right-[6%] bottom-[0%] w-[52%] -rotate-[2deg] z-20" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-6 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="min-w-0">
          <h1 className="font-display text-[2.55rem] font-bold leading-[0.98] sm:text-6xl xl:text-[5.2rem]">
            Tu estilo, estampado en todo lo que usas
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-tinta-suave sm:text-xl">
            Poleras, tazones, tote bags y regalos con tu nombre, tu foto o tu logo. Hechos a mano en Machalí y enviados a todo Chile.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tienda" size="lg">
              Ver tienda
            </ButtonLink>
            <ButtonLink href="/personaliza" size="lg" variant="outline">
              Personaliza el tuyo
            </ButtonLink>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-tinta-suave">
            {["Hecho a mano en Chile", "Retiro gratis en Machalí", "Atención por WhatsApp"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-verde" strokeWidth={2.5} /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[34rem]">
          <Splash seed={7} color="var(--color-amarillo)" className="absolute -left-[6%] top-[28%] w-[52%]" />
          <Splash seed={13} color="var(--color-cian-claro)" opacity={0.85} className="absolute right-[2%] top-[34%] w-[40%]" />
          <Splash seed={2} color="var(--color-magenta)" opacity={0.9} className="absolute left-[34%] -top-[6%] w-[30%]" />
          {COLLAGE.map((c, i) => {
            const p = getProduct(c.slug)!;
            return (
              <Link
                key={c.slug}
                href={`/producto/${p.slug}`}
                className={`group absolute block ${c.cls} transition-transform duration-300 hover:z-30 hover:rotate-0 hover:scale-[1.03]`}
              >
                <div className="aspect-square overflow-hidden rounded-[1.4rem] border-[6px] border-white bg-white shadow-[var(--shadow-alta)]">
                  <ProductVisual product={p} text={c.text} color={c.color} priority={i === 0} sizes="(min-width:1024px) 300px, 55vw" />
                </div>
                <span className="absolute -bottom-3 left-3 whitespace-nowrap rounded-full bg-tinta px-3 py-1.5 text-xs font-bold text-white shadow-[var(--shadow-suave)]">
                  {c.label} {formatCLP(p.price)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
