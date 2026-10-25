import { site } from "@/config/site";
import { formatCLP } from "@/lib/format";

export function SummaryRows({ subtotal, shipping, delivery, freeShipping }: { subtotal: number; shipping?: number; delivery?: "courier" | "retiro"; freeShipping?: boolean }) {
  const total = subtotal + (shipping ?? 0);
  return (
    <dl className="space-y-2 text-[0.95rem]">
      <div className="flex justify-between"><dt className="text-tinta-suave">Subtotal</dt><dd className="font-semibold tabular-nums">{formatCLP(subtotal)}</dd></div>
      <div className="flex justify-between gap-4">
        <dt className="text-tinta-suave">Envío</dt>
        <dd className="text-right font-semibold tabular-nums">
          {delivery === undefined
            ? "Se calcula en el checkout"
            : delivery === "retiro"
              ? `Gratis (retiro en ${site.location.city})`
              : freeShipping
                ? <span className="text-verde">¡Gratis!</span>
                : <>{formatCLP(shipping ?? 0)}<span className="block text-xs font-normal text-tinta-suave">referencial, se confirma por WhatsApp</span></>}
        </dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-linea pt-3">
        <dt className="font-bold">Total</dt>
        <dd className="text-2xl font-bold tabular-nums">{formatCLP(total)}</dd>
      </div>
    </dl>
  );
}
