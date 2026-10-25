"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { site } from "@/config/site";
import { regiones } from "@/data/regiones";
import { cartSubtotal, useCart } from "@/lib/cart-store";
import { formatCLP } from "@/lib/format";
import { buildOrder, onlineProvider, primaryProvider, shippingFor, type Customer } from "@/lib/payments";
import { formatRut, isValidRut } from "@/lib/rut";
import { useHydrated } from "@/lib/use-hydrated";
import { Button } from "@/components/ui/Button";
import { IconLock, IconWhatsApp } from "@/components/ui/Icons";
import { a11y, Field, inputClass } from "@/components/forms/Field";
import { EmptyCart } from "./EmptyCart";
import { SummaryRows } from "./OrderSummary";
import { ProductVisual } from "@/components/product/ProductVisual";
import { getProduct } from "@/data/products";

export const LAST_ORDER_KEY = "stampachic-ultimo-pedido";

type Errors = Partial<Record<keyof Customer, string>>;

const EMPTY: Customer = {
  name: "",
  rut: "",
  phone: "",
  email: "",
  region: "Libertador General Bernardo O'Higgins",
  comuna: "",
  address: "",
  delivery: "courier",
  notes: "",
};

function validate(c: Customer): Errors {
  const e: Errors = {};
  if (c.name.trim().length < 3) e.name = "Escribe tu nombre y apellido.";
  if (!isValidRut(c.rut)) e.rut = "Revisa tu RUT. Debe tener el formato 12.345.678-5.";
  if (c.phone.replace(/\D/g, "").length < 8) e.phone = "Escribe un teléfono válido, ej: 9 1234 5678.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) e.email = "Escribe un correo válido, ej: nombre@correo.cl.";
  if (c.delivery === "courier") {
    if (!c.region) e.region = "Elige tu región.";
    if (!c.comuna) e.comuna = "Elige tu comuna.";
    if (c.address.trim().length < 5) e.address = "Escribe calle, número y depto si corresponde.";
  }
  return e;
}

export function CheckoutForm() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const hydrated = useHydrated();
  const router = useRouter();
  const [c, setC] = useState<Customer>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string>();
  const [sending, setSending] = useState(false);

  if (!hydrated) return <div className="h-96" aria-busy="true" />;
  if (items.length === 0) return <EmptyCart />;

  const subtotal = cartSubtotal(items);
  const { shipping, freeShipping } = shippingFor(subtotal, c.delivery);
  const comunas = regiones.find((r) => r.name === c.region)?.comunas ?? [];

  const set = <K extends keyof Customer>(k: K, v: Customer[K]) => {
    setC((prev) => ({ ...prev, [k]: v, ...(k === "region" ? { comuna: "" } : {}) }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(c);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setSending(true);
    const order = buildOrder(items, { ...c, rut: formatRut(c.rut) });
    const result = await primaryProvider.startCheckout(order);
    if (result.kind === "error") {
      setSubmitError(result.message);
      setSending(false);
      return;
    }
    try {
      sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify({ order, url: result.url }));
    } catch {}
    window.open(result.url, "_blank", "noopener");
    clear();
    router.push(`/checkout/confirmacion?pedido=${order.number}`);
  }

  const input = (k: keyof Customer, hint?: string) => ({
    ...a11y(k, errors[k], hint),
    value: c[k] ?? "",
    className: `${inputClass} h-12 ${errors[k] ? "border-magenta" : "border-linea"}`,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1fr_400px]">
      <div className="space-y-10">
        {Object.values(errors).some(Boolean) && (
          <div role="alert" className="rounded-xl border border-magenta/40 bg-magenta/5 p-4 text-sm">
            <strong>Revisa los campos marcados</strong> para poder confirmar tu pedido.
          </div>
        )}

        <fieldset className="space-y-5">
          <legend className="font-display mb-4 text-2xl font-bold">Tus datos</legend>
          <Field id="name" label="Nombre y apellido" error={errors.name}>
            <input {...input("name")} autoComplete="name" onChange={(e) => set("name", e.target.value)} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="rut" label="RUT" error={errors.rut} hint="Para la boleta y el envío.">
              <input
                {...input("rut", "Para la boleta y el envío.")}
                inputMode="text"
                placeholder="12.345.678-5"
                maxLength={12}
                onChange={(e) => set("rut", e.target.value)}
                onBlur={() => c.rut && set("rut", formatRut(c.rut))}
              />
            </Field>
            <Field id="phone" label="Teléfono (WhatsApp)" error={errors.phone}>
              <input {...input("phone")} type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" onChange={(e) => set("phone", e.target.value)} />
            </Field>
          </div>
          <Field id="email" label="Correo electrónico" error={errors.email}>
            <input {...input("email")} type="email" autoComplete="email" placeholder="nombre@correo.cl" onChange={(e) => set("email", e.target.value)} />
          </Field>
        </fieldset>

        <fieldset>
          <legend className="font-display mb-4 text-2xl font-bold">¿Cómo lo quieres recibir?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              { v: "courier", t: "Envío por courier", d: freeShipping ? "¡Gratis para tu pedido!" : `Desde ${formatCLP(site.shipping.courierBaseRate)} a todo Chile` },
              { v: "retiro", t: `Retiro en ${site.location.city}`, d: "Gratis, coordinamos por WhatsApp" },
            ] as const).map((o) => (
              <label key={o.v} className="cursor-pointer">
                <input type="radio" name="delivery" value={o.v} checked={c.delivery === o.v} onChange={() => set("delivery", o.v)} className="peer sr-only" />
                <span className="block rounded-xl border-2 border-linea bg-white p-4 transition peer-checked:border-tinta peer-checked:shadow-[inset_0_0_0_1px_var(--color-tinta)] peer-focus-visible:ring-2 peer-focus-visible:ring-cian-claro">
                  <span className="block font-bold">{o.t}</span>
                  <span className="block text-sm text-tinta-suave">{o.d}</span>
                </span>
              </label>
            ))}
          </div>

          {c.delivery === "courier" ? (
            <div className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="region" label="Región" error={errors.region}>
                  <select {...input("region")} autoComplete="address-level1" onChange={(e) => set("region", e.target.value)}>
                    <option value="">Elige tu región</option>
                    {regiones.map((r) => (
                      <option key={r.name} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </Field>
                <Field id="comuna" label="Comuna" error={errors.comuna}>
                  <select {...input("comuna")} autoComplete="address-level2" disabled={!c.region} onChange={(e) => set("comuna", e.target.value)}>
                    <option value="">Elige tu comuna</option>
                    {comunas.map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field id="address" label="Dirección" error={errors.address}>
                <input {...input("address")} autoComplete="street-address" placeholder="Calle, número, depto o casa" onChange={(e) => set("address", e.target.value)} />
              </Field>
              <p className="text-sm text-tinta-suave">{site.shipping.courierNote}</p>
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-algodon p-4 text-sm">{site.shipping.pickupNote}</p>
          )}
        </fieldset>

        <Field id="notes" label="Notas del pedido" optional>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={c.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="¿Es un regalo? ¿Lo necesitas para una fecha especial? Cuéntanos."
            className={`${inputClass} border-linea py-3`}
          />
        </Field>
      </div>

      <aside className="h-fit space-y-5 rounded-[var(--radius-card)] bg-algodon p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-2xl font-bold">Tu pedido</h2>
        <ul className="space-y-3">
          {items.map((i) => {
            const p = getProduct(i.slug);
            return (
              <li key={i.id} className="flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                  {p && <ProductVisual product={p} color={i.colorHex} text={i.personalization?.text} image={i.personalization?.imageThumb} sizes="64px" />}
                  <span className="absolute -right-0 -top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-tinta px-1 text-[0.7rem] font-bold text-white">{i.quantity}</span>
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-semibold leading-tight">{i.name}</p>
                  <p className="text-tinta-suave">{[i.size && `Talla ${i.size}`, i.color, i.personalization?.text && `“${i.personalization.text}”`].filter(Boolean).join(", ")}</p>
                </div>
                <p className="text-sm font-semibold tabular-nums">{formatCLP(i.price * i.quantity)}</p>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-linea pt-4">
          <SummaryRows subtotal={subtotal} shipping={shipping} delivery={c.delivery} freeShipping={freeShipping} />
        </div>
        {submitError && <p role="alert" className="text-sm font-semibold text-magenta">{submitError}</p>}
        <Button type="submit" variant="whatsapp" size="lg" className="w-full" disabled={sending}>
          <IconWhatsApp className="h-5 w-5" /> {sending ? "Abriendo WhatsApp…" : "Confirmar pedido por WhatsApp"}
        </Button>
        <Button type="button" variant="outline" size="lg" className="w-full" disabled={!onlineProvider.enabled} aria-describedby="pago-online-nota">
          <IconLock className="h-5 w-5" /> {onlineProvider.enabled ? onlineProvider.label : "Pagar online (próximamente)"}
        </Button>
        <p id="pago-online-nota" className="text-xs leading-relaxed text-tinta-suave">
          Al confirmar se abre WhatsApp con el detalle de tu pedido. Te respondemos con los datos de pago (transferencia, débito o crédito) y la boleta. No cobramos nada hasta que confirmes.
        </p>
        <Link href="/carrito" className="block text-center text-sm font-semibold underline underline-offset-4">Editar carrito</Link>
      </aside>
    </form>
  );
}
