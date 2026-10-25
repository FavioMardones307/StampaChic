"use client";

import Link from "next/link";
import { getProduct } from "@/data/products";
import { useCart, type CartItem } from "@/lib/cart-store";
import { formatCLP } from "@/lib/format";
import { ProductVisual } from "@/components/product/ProductVisual";
import { IconMinus, IconPlus, IconTrash } from "@/components/ui/Icons";

export function QuantityInput({ value, onChange, label, size = "sm" }: { value: number; onChange: (n: number) => void; label: string; size?: "sm" | "lg" }) {
  const h = size === "lg" ? "h-12" : "h-9";
  const w = size === "lg" ? "w-12" : "w-9";
  return (
    <div className={`inline-flex items-center rounded-full border border-linea bg-white ${h}`} role="group" aria-label={label}>
      <button type="button" className={`flex ${h} ${w} items-center justify-center rounded-full hover:bg-algodon disabled:opacity-40`} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Restar uno">
        <IconMinus className="h-4 w-4" />
      </button>
      <span className="min-w-8 text-center text-sm font-bold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={`flex ${h} ${w} items-center justify-center rounded-full hover:bg-algodon disabled:opacity-40`} onClick={() => onChange(value + 1)} disabled={value >= 99} aria-label="Sumar uno">
        <IconPlus className="h-4 w-4" />
      </button>
    </div>
  );
}

function Line({ item, onNavigate }: { item: CartItem; onNavigate?: () => void }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const product = getProduct(item.slug);
  const p = item.personalization;
  return (
    <li className="flex gap-4 py-4">
      <Link href={`/producto/${item.slug}`} onClick={onNavigate} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-algodon">
        {product && <ProductVisual product={product} color={item.colorHex} text={p?.text} image={p?.imageThumb} sizes="96px" />}
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/producto/${item.slug}`} onClick={onNavigate} className="font-semibold leading-snug hover:underline">
            {item.name}
          </Link>
          <p className="shrink-0 font-bold tabular-nums">{formatCLP(item.price * item.quantity)}</p>
        </div>
        <p className="mt-0.5 text-sm text-tinta-suave">
          {[item.size && `Talla ${item.size}`, item.color].filter(Boolean).join(", ") || formatCLP(item.price) + " c/u"}
        </p>
        {(p?.text || p?.imageName || p?.notes) && (
          <dl className="mt-2 space-y-0.5 rounded-lg bg-algodon px-3 py-2 text-[0.8rem] text-tinta-suave">
            {p.text && (
              <div className="flex gap-1"><dt className="font-semibold text-tinta">Texto:</dt><dd className="truncate">“{p.text}”</dd></div>
            )}
            {p.imageName && (
              <div className="flex gap-1"><dt className="font-semibold text-tinta">Diseño:</dt><dd className="truncate">{p.imageName}</dd></div>
            )}
            {p.notes && (
              <div className="flex gap-1"><dt className="font-semibold text-tinta">Notas:</dt><dd className="line-clamp-2">{p.notes}</dd></div>
            )}
          </dl>
        )}
        <div className="mt-3 flex items-center justify-between">
          <QuantityInput value={item.quantity} onChange={(n) => setQuantity(item.id, n)} label={`Cantidad de ${item.name}`} />
          <button type="button" onClick={() => remove(item.id)} className="flex items-center gap-1 rounded-full px-2 py-1 text-sm text-tinta-suave hover:text-magenta">
            <IconTrash className="h-4 w-4" /> Quitar
          </button>
        </div>
      </div>
    </li>
  );
}

export function CartLines({ items, onNavigate }: { items: CartItem[]; onNavigate?: () => void }) {
  return (
    <ul className="divide-y divide-linea">
      {items.map((i) => (
        <Line key={i.id} item={i} onNavigate={onNavigate} />
      ))}
    </ul>
  );
}
