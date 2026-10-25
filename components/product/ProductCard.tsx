import Link from "next/link";
import { tagLabels, type Product } from "@/data/products";
import { formatCLP } from "@/lib/format";
import { IconArrowRight } from "@/components/ui/Icons";
import { ProductVisual } from "./ProductVisual";

const TAG_STYLE = {
  nuevo: "bg-white text-tinta",
  "mas-vendido": "bg-tinta text-white",
  pack: "bg-magenta text-white",
} as const;

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const colors = product.colors ?? [];
  return (
    <Link href={`/producto/${product.slug}`} className="group relative block rounded-[1.5rem] focus-visible:outline-offset-4">
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-algodon">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]">
          <ProductVisual product={product} priority={priority} />
        </div>
        {product.tags.length > 0 && (
          <ul className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <li key={t} className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold leading-none shadow-sm ${TAG_STYLE[t]}`}>
                {tagLabels[t]}
              </li>
            ))}
          </ul>
        )}
        <span
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-tinta shadow-[var(--shadow-suave)] transition-colors group-hover:bg-magenta group-hover:text-white"
          aria-hidden
        >
          <IconArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
        </span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug text-tinta">{product.name}</h3>
          {colors.length > 1 ? (
            <p className="mt-1.5 flex items-center gap-1">
              <span className="sr-only">{colors.length} colores</span>
              {colors.slice(0, 5).map((c) => (
                <span key={c.name} className="h-3.5 w-3.5 rounded-full border border-tinta/15" style={{ background: c.hex }} aria-hidden />
              ))}
            </p>
          ) : (
            <p className="mt-0.5 line-clamp-1 text-sm text-tinta-suave">{product.short}</p>
          )}
        </div>
        <p className="shrink-0 text-right">
          <span className="block font-semibold">{formatCLP(product.price)}</span>
          {product.compareAt && <span className="block text-xs text-tinta-suave line-through">{formatCLP(product.compareAt)}</span>}
        </p>
      </div>
    </Link>
  );
}
