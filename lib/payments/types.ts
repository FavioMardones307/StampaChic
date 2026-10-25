import type { CartItem } from "@/lib/cart-store";

export type DeliveryMethod = "courier" | "retiro";

export type Customer = {
  name: string;
  rut: string;
  phone: string;
  email: string;
  region: string;
  comuna: string;
  address: string;
  delivery: DeliveryMethod;
  notes?: string;
};

export type Order = {
  number: string;
  createdAt: string;
  items: CartItem[];
  customer: Customer;
  subtotal: number;
  shipping: number;
  /** true si el envío es gratis por superar el umbral */
  freeShipping: boolean;
  total: number;
};

/**
 * Resultado de iniciar un pago:
 * - "redirect": abrir la URL (WhatsApp, Mercado Pago, Webpay...)
 * - "error": mostrar el mensaje al cliente
 */
export type CheckoutResult = { kind: "redirect"; url: string } | { kind: "error"; message: string };

/**
 * Contrato que debe cumplir cualquier medio de pago.
 * Para integrar Mercado Pago o Webpay, implementa esta interfaz
 * (ver mercadopago.ts y webpay.ts) y regístrala en index.ts.
 */
export interface PaymentProvider {
  id: "whatsapp" | "mercadopago" | "webpay";
  label: string;
  enabled: boolean;
  startCheckout(order: Order): Promise<CheckoutResult>;
}
