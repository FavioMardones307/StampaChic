"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import type { Order } from "@/lib/payments";
import { formatCLP } from "@/lib/format";
import { buttonClass } from "@/components/ui/Button";
import { IconCheck, IconWhatsApp } from "@/components/ui/Icons";
import { LAST_ORDER_KEY } from "./CheckoutForm";

const noop = () => () => {};
function readLast(): string | null {
  try {
    return sessionStorage.getItem(LAST_ORDER_KEY);
  } catch {
    return null;
  }
}

export function Confirmation() {
  const number = useSearchParams().get("pedido");
  const raw = useSyncExternalStore(noop, readLast, () => null);
  const saved = raw ? (JSON.parse(raw) as { order: Order; url: string }) : null;
  const data = saved && saved.order.number === number ? saved : null;

  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-verde text-white">
        <IconCheck className="h-10 w-10" strokeWidth={2.5} />
      </span>
      <h1 className="font-display mt-6 text-[2.4rem] font-bold sm:text-5xl">¡Gracias por tu pedido!</h1>
      {number && (
        <p className="mt-4 text-lg">
          Tu número de pedido es <strong className="whitespace-nowrap rounded-lg bg-amarillo px-2 py-0.5 font-bold tabular-nums">{number}</strong>
        </p>
      )}
      <p className="mx-auto mt-4 max-w-lg text-tinta-suave">
        Envíanos el mensaje que se abrió en WhatsApp para confirmarlo. Te responderemos con los datos de pago y te mostraremos el diseño antes de estampar.
      </p>

      {data && (
        <div className="mt-8 rounded-[var(--radius-card)] bg-algodon p-6 text-left">
          <h2 className="font-bold">Resumen</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {data.order.items.map((i) => (
              <li key={i.id} className="flex justify-between gap-4">
                <span>{i.name} × {i.quantity}{i.size ? `, talla ${i.size}` : ""}</span>
                <span className="tabular-nums">{formatCLP(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-linea pt-3 font-bold">
            <span>Total</span>
            <span className="tabular-nums">{formatCLP(data.order.total)}</span>
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {data && (
          <a href={data.url} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "lg")}>
            <IconWhatsApp className="h-5 w-5" /> ¿No se abrió WhatsApp? Envíalo aquí
          </a>
        )}
        <Link href="/tienda" className={buttonClass("outline", "lg")}>Seguir mirando</Link>
      </div>
    </div>
  );
}
