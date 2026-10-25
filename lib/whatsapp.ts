import { site } from "@/config/site";
import { formatCLP } from "@/lib/format";
import type { CartItem } from "@/lib/cart-store";

/** Link a WhatsApp con un mensaje prellenado. */
export function waLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Describe un producto del carrito en líneas de texto (para WhatsApp). */
export function describeItem(item: CartItem, index?: number) {
  const lines: string[] = [];
  const prefix = index !== undefined ? `${index + 1}. ` : "• ";
  lines.push(`${prefix}*${item.name}* × ${item.quantity} — ${formatCLP(item.price * item.quantity)}`);
  const variant = [item.size && `Talla ${item.size}`, item.color && `Color ${item.color}`].filter(Boolean).join(" · ");
  if (variant) lines.push(`   ${variant}`);
  const p = item.personalization;
  if (p?.text) lines.push(`   ✏️ Texto: "${p.text}"`);
  if (p?.imageName) lines.push(`   🖼️ Diseño: ${p.imageName} (lo adjunto en este chat)`);
  if (p?.notes) lines.push(`   📝 Notas: ${p.notes}`);
  return lines.join("\n");
}

/** Formulario genérico (cotizaciones) → mensaje de WhatsApp. */
export function formToMessage(title: string, fields: [string, string | undefined][]) {
  const body = fields
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `*${k}:* ${v}`)
    .join("\n");
  return `¡Hola ${site.name}! 👋\n\n*${title}*\n\n${body}`;
}
