import { site } from "@/config/site";
import { formatCLP } from "@/lib/format";

export function FreeShippingMeter({ subtotal }: { subtotal: number }) {
  const goal = site.shipping.freeShippingThreshold;
  const missing = Math.max(0, goal - subtotal);
  const pct = Math.min(100, (subtotal / goal) * 100);
  return (
    <div>
      <p className="text-sm" aria-live="polite">
        {missing > 0 ? (
          <>
            Te faltan <strong>{formatCLP(missing)}</strong> para el <strong>envío gratis</strong> 🚚
          </>
        ) : (
          <strong className="text-verde">¡Tu pedido tiene envío gratis! 🎉</strong>
        )}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-linea" aria-hidden>
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-magenta),var(--color-naranja),var(--color-amarillo))] transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
