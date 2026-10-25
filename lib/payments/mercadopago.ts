import type { PaymentProvider } from "./types";

/**
 * Mercado Pago (pendiente de integrar).
 *
 * Pasos sugeridos para un desarrollador:
 * 1. Crear una Route Handler en app/api/pagos/mercadopago/route.ts que, con el
 *    Access Token (variable de entorno MP_ACCESS_TOKEN en Vercel), cree una
 *    "preferencia" con los items del pedido.
 * 2. Devolver `init_point` y redirigir al cliente con { kind: "redirect", url }.
 * 3. Configurar back_urls hacia /checkout/confirmacion y un webhook para
 *    confirmar el pago.
 */
export const mercadoPagoProvider: PaymentProvider = {
  id: "mercadopago",
  label: "Pagar con Mercado Pago",
  enabled: false,
  async startCheckout() {
    return { kind: "error", message: "El pago online con Mercado Pago estará disponible pronto." };
  },
};
