import { Suspense } from "react";
import { pageMeta } from "@/lib/seo";
import { Container } from "@/components/ui/Section";
import { ShopGrid, ShopGridFallback } from "@/components/product/ShopGrid";

export const metadata = pageMeta(
  "Tienda",
  "Poleras, polerones, jockeys, tazones, botellas, tote bags, cosmetiqueros y packs temáticos personalizados. Envíos a todo Chile desde Machalí.",
  "/tienda",
);

export default function TiendaPage() {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-[2.6rem] font-bold sm:text-6xl">La tienda</h1>
      <p className="mt-3 max-w-2xl text-lg text-tinta-suave">Elige tu base favorita y personalízala con tu nombre, tu foto o tu logo.</p>
      <div className="mt-8">
        <Suspense fallback={<ShopGridFallback />}>
          <ShopGrid />
        </Suspense>
      </div>
    </Container>
  );
}
