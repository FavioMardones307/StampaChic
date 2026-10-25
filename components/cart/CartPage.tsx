"use client";

import Link from "next/link";
import { cartSubtotal, useCart } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";
import { buttonClass } from "@/components/ui/Button";
import { CartLines } from "./CartLines";
import { EmptyCart } from "./EmptyCart";
import { FreeShippingMeter } from "./FreeShippingMeter";
import { SummaryRows } from "./OrderSummary";

export function CartPage() {
  const items = useCart((s) => s.items);
  const hydrated = useHydrated();
  if (!hydrated) return <div className="h-64" aria-busy="true" />;
  if (items.length === 0) return <EmptyCart />;
  const subtotal = cartSubtotal(items);
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div className="rounded-[var(--radius-card)] border border-linea bg-white px-5">
        <CartLines items={items} />
      </div>
      <aside className="h-fit space-y-5 rounded-[var(--radius-card)] bg-algodon p-6 lg:sticky lg:top-24">
        <FreeShippingMeter subtotal={subtotal} />
        <SummaryRows subtotal={subtotal} />
        <Link href="/checkout" className={buttonClass("primary", "lg", "w-full")}>Finalizar compra</Link>
        <Link href="/tienda" className="block text-center text-sm font-semibold underline underline-offset-4">Seguir comprando</Link>
      </aside>
    </div>
  );
}
