import { site } from "@/config/site";
import { formatCLP } from "@/lib/format";
import { describeItem, waLink } from "@/lib/whatsapp";
import type { Order, PaymentProvider } from "./types";

/** Arma el mensaje de WhatsApp con el detalle completo del pedido. */
export function orderMessage(order: Order) {
  const c = order.customer;
  const delivery =
    c.delivery === "retiro"
      ? `Retiro en ${site.location.city} (gratis)`
      : `Envío por courier a ${c.address}, ${c.comuna}, ${c.region}`;
  const shipping =
    c.delivery === "retiro"
      ? "Gratis (retiro)"
      : order.freeShipping
        ? "¡Gratis! 🎉"
        : `${formatCLP(order.shipping)} (referencial, a confirmar)`;

  return [
    `¡Hola ${site.name}! 👋 Quiero confirmar mi pedido:`,
    ``,
    `🧾 *Pedido ${order.number}*`,
    ``,
    `*Productos*`,
    order.items.map((i, n) => describeItem(i, n)).join("\n"),
    ``,
    `Subtotal: ${formatCLP(order.subtotal)}`,
    `Envío: ${shipping}`,
    `*Total: ${formatCLP(order.total)}*`,
    ``,
    `*Mis datos*`,
    `👤 ${c.name}`,
    `🪪 RUT ${c.rut}`,
    `📱 ${c.phone}`,
    `✉️ ${c.email}`,
    `🚚 ${delivery}`,
    c.notes ? `📝 ${c.notes}` : "",
    ``,
    `Quedo atenta/o a los datos para el pago. ¡Gracias!`,
  ]
    .filter((l, i, arr) => !(l === "" && arr[i - 1] === ""))
    .join("\n");
}

export const whatsappProvider: PaymentProvider = {
  id: "whatsapp",
  label: "Confirmar por WhatsApp",
  enabled: true,
  async startCheckout(order) {
    return { kind: "redirect", url: waLink(orderMessage(order)) };
  },
};
