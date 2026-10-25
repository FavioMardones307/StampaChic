import Link from "next/link";
import { tagLabels, type Product } from "@/data/products";
import { formatCLP } from "@/lib/format";
import { ProductVisual } from "./ProductVisual";

const TAG_STYLE = {
  nuevo: "bg-cian text-white",
  "mas-vendido": "bg-amarillo text-tinta",
  pack: "bg-magenta text-white",
} as const;

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/producto/${product.slug}`} className="group block rounded-[var(--radius-card)] focus-visible:outline-offset-4">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-algodon">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <ProductVisual product={product} priority={priority} />
        </div>
        {product.tags.length > 0 && (
          <ul className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <li key={t} className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold leading-none ${TAG_STYLE[t]}`}>
                {tagLabels[t]}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-3 px-0.5">
        <h3 className="font-semibold leading-snug text-tinta decoration-magenta decoration-2 underline-offset-4 group-hover:underline">
          {product.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-tinta-suave">{product.short}</p>
        <p className="mt-1.5 flex items-baseline gap-2">
          <span className="font-bold">{formatCLP(product.price)}</span>
          {product.compareAt && <span className="text-sm text-tinta-suave line-through">{formatCLP(product.compareAt)}</span>}
        </p>
      </div>
    </Link>
  );
}
