import Link from "next/link";
import { getProduct } from "@/data/products";
import { formatCLP } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight, IconCheck } from "@/components/ui/Icons";
import { Splash } from "@/components/ui/Splash";
import { ProductVisual } from "@/components/product/ProductVisual";

export function Hero() {
  const poleron = getProduct("poleron-canguro-personalizado")!;
  const pack = getProduct("pack-dia-del-tens")!;
  const tazon = getProduct("tazon-clasico-11oz")!;
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="min-w-0">
          <h1 className="font-display text-[2.7rem] font-bold leading-[1] sm:text-6xl xl:text-[4.9rem]">
            Tu estilo, estampado en todo lo que usas
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-tinta-suave sm:text-xl">
            Poleras, tazones, tote bags y regalos con tu nombre, tu foto o tu logo. Hechos a mano en Machalí y enviados a todo Chile.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tienda" size="lg">
              Ver tienda <IconArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/personaliza" size="lg" variant="outline">
              Personaliza el tuyo
            </ButtonLink>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-tinta-suave">
            {["Hecho a mano en Chile", "Retiro gratis en Machalí", "Atención por WhatsApp"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-magenta" strokeWidth={2.5} /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          {/* Explosión de color, como la del logo */}
          <Splash seed={5} color="#8b3fd9" className="absolute -left-[4%] -top-[2%] w-[42%]" />
          <Splash seed={12} color="#2bb3d6" className="absolute -right-[3%] top-[30%] w-[34%]" />
          <Splash seed={21} color="#ffc21a" className="absolute -bottom-[3%] left-[22%] w-[34%]" />
          <Splash seed={8} color="#d6136f" className="absolute -bottom-[2%] -right-[2%] w-[40%]" />

          <Link
            href={`/producto/${poleron.slug}`}
            className="absolute inset-[9%] block overflow-hidden rounded-[1.75rem] border-[6px] border-white bg-algodon shadow-[var(--shadow-alta)] transition-transform duration-500 hover:-rotate-1 hover:scale-[1.02]"
          >
            <ProductVisual product={poleron} color="#1D1B20" text="Tu Marca" priority sizes="(min-width:1024px) 440px, 82vw" />
          </Link>

          <Link
            href={`/producto/${pack.slug}`}
            className="absolute -bottom-1 left-0 flex items-center gap-3 rounded-2xl bg-white p-2 pr-4 shadow-[var(--shadow-alta)] transition-transform hover:-translate-y-0.5"
          >
            <span className="relative block h-14 w-14 overflow-hidden rounded-xl">
              <ProductVisual product={pack} sizes="56px" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold">{pack.name}</span>
              <span className="text-tinta-suave">{formatCLP(pack.price)}</span>
            </span>
          </Link>

          <Link
            href={`/producto/${tazon.slug}`}
            className="absolute right-0 top-[4%] hidden items-center gap-3 rounded-2xl bg-white p-2 pr-4 shadow-[var(--shadow-alta)] transition-transform hover:-translate-y-0.5 sm:flex"
          >
            <span className="relative block h-12 w-12 overflow-hidden rounded-xl">
              <ProductVisual product={tazon} text="Mamá" sizes="48px" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold">Tazón con tu foto</span>
              <span className="text-tinta-suave">{formatCLP(tazon.price)}</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
