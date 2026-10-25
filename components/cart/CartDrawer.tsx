"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cartCount, cartSubtotal, useCart } from "@/lib/cart-store";
import { formatCLP } from "@/lib/format";
import { useHydrated } from "@/lib/use-hydrated";
import { buttonClass } from "@/components/ui/Button";
import { IconClose } from "@/components/ui/Icons";
import { CartLines } from "./CartLines";
import { EmptyCart } from "./EmptyCart";
import { FreeShippingMeter } from "./FreeShippingMeter";

export function CartDrawer() {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const hydrated = useHydrated();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && d.open) {
      d.close();
    }
  }, [isOpen]);

  const onClose = () => {
    document.body.style.overflow = "";
    close();
  };

  const subtotal = cartSubtotal(items);
  const count = cartCount(items);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="carrito-titulo"
      className="drawer fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-md bg-papel p-0 text-tinta shadow-[var(--shadow-alta)] backdrop:bg-tinta/50 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-linea px-5 py-4">
          <h2 id="carrito-titulo" className="font-display text-xl font-bold">
            Tu carrito {hydrated && count > 0 && <span className="text-tinta-suave">({count})</span>}
          </h2>
          <button type="button" onClick={() => ref.current?.close()} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-algodon" aria-label="Cerrar carrito">
            <IconClose />
          </button>
        </div>

        {!hydrated || items.length === 0 ? (
          <div className="flex-1 overflow-y-auto">
            <EmptyCart onNavigate={() => ref.current?.close()} />
          </div>
        ) : (
          <>
            <div className="border-b border-linea px-5 py-4">
              <FreeShippingMeter subtotal={subtotal} />
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              <CartLines items={items} onNavigate={() => ref.current?.close()} />
            </div>
            <div className="border-t border-linea bg-white px-5 pb-6 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-tinta-suave">Subtotal</span>
                <span className="text-xl font-bold tabular-nums">{formatCLP(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-tinta-suave">El envío se calcula en el siguiente paso.</p>
              <Link href="/checkout" onClick={() => ref.current?.close()} className={buttonClass("primary", "lg", "mt-4 w-full")}>
                Finalizar compra
              </Link>
              <Link href="/carrito" onClick={() => ref.current?.close()} className="mt-3 block text-center text-sm font-semibold underline underline-offset-4">
                Ver carrito completo
              </Link>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
