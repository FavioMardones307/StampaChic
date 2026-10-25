import { site } from "@/config/site";
import { cartSubtotal, type CartItem } from "@/lib/cart-store";
import { mercadoPagoProvider } from "./mercadopago";
import type { Customer, Order, PaymentProvider } from "./types";
import { webpayProvider } from "./webpay";
import { whatsappProvider } from "./whatsapp";

export type { Customer, Order, PaymentProvider } from "./types";

/** Medio de cierre principal (hoy: WhatsApp) */
export const primaryProvider: PaymentProvider = whatsappProvider;

/** Medio de pago online configurado en config/site.ts */
export const onlineProvider: PaymentProvider = {
  ...(site.onlinePayments.provider === "webpay" ? webpayProvider : mercadoPagoProvider),
  enabled: site.onlinePayments.enabled,
};

/** Número de pedido corto y legible, ej. SC-251026-4821 */
export function newOrderNumber(date = new Date()) {
  const y = String(date.getFullYear()).slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SC-${y}${m}${d}-${rand}`;
}

export function shippingFor(subtotal: number, delivery: Customer["delivery"]) {
  if (delivery === "retiro") return { shipping: 0, freeShipping: false };
  const free = subtotal >= site.shipping.freeShippingThreshold;
  return { shipping: free ? 0 : site.shipping.courierBaseRate, freeShipping: free };
}

export function buildOrder(items: CartItem[], customer: Customer): Order {
  const subtotal = cartSubtotal(items);
  const { shipping, freeShipping } = shippingFor(subtotal, customer.delivery);
  // Las miniaturas no viajan en el pedido: el diseño se adjunta por WhatsApp.
  const clean = items.map((i) => ({
    ...i,
    personalization: i.personalization ? { ...i.personalization, imageThumb: undefined } : undefined,
  }));
  return {
    number: newOrderNumber(),
    createdAt: new Date().toISOString(),
    items: clean,
    customer,
    subtotal,
    shipping,
    freeShipping,
    total: subtotal + shipping,
  };
}
