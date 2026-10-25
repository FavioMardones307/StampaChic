import type { PaymentProvider } from "./types";

/**
 * Webpay Plus de Transbank (pendiente de integrar).
 *
 * Pasos sugeridos para un desarrollador:
 * 1. Instalar el SDK oficial `transbank-sdk` y crear app/api/pagos/webpay/route.ts
 *    que llame a `WebpayPlus.Transaction.create(buyOrder, sessionId, amount, returnUrl)`.
 * 2. Redirigir al cliente al `url` + `token` que entrega Transbank.
 * 3. En la URL de retorno, confirmar con `commit(token)` y mostrar /checkout/confirmacion.
 * Usa las credenciales de integración de Transbank para probar antes de producción.
 */
export const webpayProvider: PaymentProvider = {
  id: "webpay",
  label: "Pagar con Webpay",
  enabled: false,
  async startCheckout() {
    return { kind: "error", message: "El pago online con Webpay estará disponible pronto." };
  },
};
