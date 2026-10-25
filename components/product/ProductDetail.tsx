"use client";

import { useId, useState } from "react";
import { site } from "@/config/site";
import { tagLabels, type Product } from "@/data/products";
import { useCart } from "@/lib/cart-store";
import { formatCLP } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import { Button, buttonClass } from "@/components/ui/Button";
import { IconCheck, IconClock, IconClose, IconPin, IconTruck, IconUpload, IconWhatsApp } from "@/components/ui/Icons";
import { QuantityInput } from "@/components/cart/CartLines";
import { Gallery } from "./Gallery";
import { ProductVisual } from "./ProductVisual";
import { SizeGuide } from "./SizeGuide";

const MAX_MB = 15;

/** Reduce la imagen a una miniatura liviana (para la vista previa y el carrito). */
function makeThumb(file: File, max = 360): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No pudimos leer la imagen"));
    };
    img.src = url;
  });
}

export function ProductDetail({ product }: { product: Product }) {
  const uid = useId();
  const add = useCart((s) => s.add);

  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState<string>();
  const [qty, setQty] = useState(1);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<{ name: string; thumb: string }>();
  const [imageError, setImageError] = useState<string>();
  const [sizeError, setSizeError] = useState(false);
  const [view, setView] = useState(0);
  const [added, setAdded] = useState(false);

  const color = product.colors?.[colorIdx];

  // Vistas de la galería: fotos reales o dibujos en cada color
  const views =
    product.images.length > 0
      ? product.images.map((_, i) => ({
          key: `foto-${i}`,
          label: `${product.name}, foto ${i + 1}`,
          node: <ProductVisual product={product} index={i} sizes="(min-width:1024px) 50vw, 100vw" priority={i === 0} />,
        }))
      : [
          {
            key: "preview",
            label: `${product.name}, vista previa`,
            node: <ProductVisual product={product} color={color?.hex} text={text || undefined} image={image?.thumb} />,
          },
          ...(product.colors ?? [])
            .map((c, i) => ({ c, i }))
            .filter(({ i }) => i !== colorIdx)
            .slice(0, 4)
            .map(({ c }) => ({
              key: `color-${c.name}`,
              label: `${product.name} en ${c.name}`,
              node: <ProductVisual product={product} color={c.hex} text={text || undefined} image={image?.thumb} />,
            })),
        ];

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setImageError(undefined);
    if (!file) return;
    if (!file.type.startsWith("image/")) return setImageError("Sube un archivo de imagen (JPG, PNG o WEBP).");
    if (file.size > MAX_MB * 1024 * 1024) return setImageError(`La imagen pesa más de ${MAX_MB} MB. Prueba con una más liviana.`);
    try {
      setImage({ name: file.name, thumb: await makeThumb(file) });
      setView(0);
    } catch {
      setImageError("No pudimos leer la imagen. Prueba con otro archivo.");
    }
  }

  function validate() {
    if (product.sizes && !size) {
      setSizeError(true);
      document.getElementById(`${uid}-tallas`)?.scrollIntoView({ block: "center" });
      return false;
    }
    return true;
  }

  const personalization = {
    text: text.trim() || undefined,
    notes: notes.trim() || undefined,
    imageName: image?.name,
    imageThumb: image?.thumb,
  };

  function onAdd() {
    if (!validate()) return;
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: qty,
      size,
      color: color?.name,
      colorHex: color?.hex,
      personalization,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const waMessage = [
    `¡Hola ${site.name}! 👋 Quiero comprar:`,
    ``,
    `*${product.name}* × ${qty} — ${formatCLP(product.price * qty)}`,
    size && `Talla: ${size}`,
    color && `Color: ${color.name}`,
    personalization.text && `Texto: "${personalization.text}"`,
    image && `Diseño: ${image.name} (te lo adjunto aquí)`,
    personalization.notes && `Notas: ${personalization.notes}`,
    ``,
    `¿Me confirmas disponibilidad y plazo? ¡Gracias!`,
  ]
    .filter((l): l is string => typeof l === "string")
    .join("\n");

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <Gallery views={views} active={Math.min(view, views.length - 1)} onChange={setView} />

      <div>
        {product.tags.length > 0 && (
          <ul className="mb-3 flex gap-2">
            {product.tags.map((t) => (
              <li key={t} className="rounded-full bg-algodon px-3 py-1 text-xs font-bold">
                {tagLabels[t]}
              </li>
            ))}
          </ul>
        )}
        <h1 className="font-display text-[2.2rem] font-bold leading-tight sm:text-5xl">{product.name}</h1>
        <p className="mt-3 flex items-baseline gap-3">
          <span className="text-3xl font-bold">{formatCLP(product.price)}</span>
          {product.compareAt && (
            <>
              <span className="text-lg text-tinta-suave line-through">{formatCLP(product.compareAt)}</span>
              <span className="rounded-full bg-magenta px-2.5 py-1 text-xs font-bold text-white">
                Ahorras {formatCLP(product.compareAt - product.price)}
              </span>
            </>
          )}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-tinta-suave">{product.short}</p>

        <form
          className="mt-8 space-y-7"
          onSubmit={(e) => {
            e.preventDefault();
            onAdd();
          }}
        >
          {product.colors && (
            <fieldset>
              <legend className="font-semibold">
                Color: <span className="font-normal text-tinta-suave">{color?.name}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((c, i) => (
                  <label key={c.name} className="relative cursor-pointer" title={c.name}>
                    <input
                      type="radio"
                      name="color"
                      className="peer sr-only"
                      checked={i === colorIdx}
                      onChange={() => {
                        setColorIdx(i);
                        setView(0);
                      }}
                    />
                    <span className="sr-only">{c.name}</span>
                    <span
                      className="block h-10 w-10 rounded-full border border-tinta/20 ring-offset-2 ring-offset-papel transition peer-checked:ring-2 peer-checked:ring-tinta peer-focus-visible:ring-2 peer-focus-visible:ring-cian-claro"
                      style={{ background: c.hex }}
                      aria-hidden
                    />
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {product.sizes && (
            <fieldset id={`${uid}-tallas`} aria-describedby={sizeError ? `${uid}-talla-error` : undefined}>
              <div className="flex items-center justify-between">
                <legend className="font-semibold">
                  Talla {size && <span className="font-normal text-tinta-suave">{size}</span>}
                </legend>
                {product.sizeGuide && <SizeGuide type={product.sizeGuide} />}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <label key={s} className="cursor-pointer">
                    <input
                      type="radio"
                      name="talla"
                      value={s}
                      className="peer sr-only"
                      checked={size === s}
                      onChange={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                    />
                    <span className="flex h-11 min-w-12 items-center justify-center rounded-xl border-2 border-linea bg-white px-3 font-semibold transition peer-checked:border-tinta peer-checked:bg-tinta peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-cian-claro hover:border-tinta">
                      {s}
                    </span>
                  </label>
                ))}
              </div>
              {sizeError && (
                <p id={`${uid}-talla-error`} role="alert" className="mt-2 text-sm font-semibold text-magenta">
                  Elige una talla para continuar.
                </p>
              )}
            </fieldset>
          )}

          <fieldset className="rounded-[var(--radius-card)] border border-linea bg-white p-5">
            <legend className="px-1 font-display text-lg font-bold">Hazlo tuyo</legend>
            <p className="text-sm text-tinta-suave">La vista previa es referencial. Antes de estampar te enviamos el diseño final por WhatsApp para tu aprobación.</p>
            {product.personalization.text && (
              <div className="mt-4">
                <label htmlFor={`${uid}-texto`} className="text-sm font-semibold">
                  {product.personalization.textLabel ?? "Texto"} <span className="font-normal text-tinta-suave">(opcional)</span>
                </label>
                <input
                  id={`${uid}-texto`}
                  value={text}
                  maxLength={60}
                  onChange={(e) => {
                    setText(e.target.value);
                    setView(0);
                  }}
                  placeholder="Ej: Sofía"
                  className="mt-1.5 h-12 w-full rounded-xl border border-linea bg-papel px-4 focus:border-tinta focus:outline-none"
                />
              </div>
            )}
            {product.personalization.image && (
              <div className="mt-4">
                <span className="text-sm font-semibold" id={`${uid}-img-label`}>
                  Tu imagen o logo <span className="font-normal text-tinta-suave">(opcional)</span>
                </span>
                {image ? (
                  <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-linea bg-papel p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.thumb} alt="Vista previa de tu imagen" className="h-14 w-14 rounded-lg object-cover" />
                    <span className="min-w-0 flex-1 truncate text-sm">{image.name}</span>
                    <button type="button" onClick={() => setImage(undefined)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-algodon" aria-label="Quitar imagen">
                      <IconClose className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="mt-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-linea bg-papel px-4 py-5 text-sm font-semibold hover:border-tinta focus-within:border-tinta">
                    <IconUpload className="h-5 w-5" /> Subir imagen (JPG o PNG)
                    <input type="file" accept="image/*" className="sr-only" onChange={onFile} aria-labelledby={`${uid}-img-label`} />
                  </label>
                )}
                {imageError && (
                  <p role="alert" className="mt-2 text-sm font-semibold text-magenta">
                    {imageError}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-tinta-suave">Al confirmar tu pedido nos envías el archivo original en alta calidad por WhatsApp.</p>
              </div>
            )}
            <div className="mt-4">
              <label htmlFor={`${uid}-notas`} className="text-sm font-semibold">
                Notas para tu pedido <span className="font-normal text-tinta-suave">(opcional)</span>
              </label>
              <textarea
                id={`${uid}-notas`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                maxLength={300}
                placeholder="Colores, tipografía, ubicación del diseño, fecha en que lo necesitas…"
                className="mt-1.5 w-full rounded-xl border border-linea bg-papel px-4 py-3 focus:border-tinta focus:outline-none"
              />
            </div>
          </fieldset>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuantityInput value={qty} onChange={setQty} label="Cantidad" size="lg" />
            <Button type="submit" size="lg" className="w-full sm:w-auto sm:flex-1" aria-live="polite">
              {added ? (
                <>
                  <IconCheck className="h-5 w-5" strokeWidth={2.5} /> Agregado al carrito
                </>
              ) : (
                <>Agregar al carrito · {formatCLP(product.price * qty)}</>
              )}
            </Button>
          </div>
          <a
            href={waLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!validate()) e.preventDefault();
            }}
            className={buttonClass("whatsapp", "lg", "w-full")}
          >
            <IconWhatsApp className="h-5 w-5" /> Comprar por WhatsApp
          </a>
        </form>

        <ul className="mt-8 divide-y divide-linea rounded-[var(--radius-card)] border border-linea bg-white text-sm">
          <li className="flex gap-3 p-4">
            <IconClock className="h-5 w-5 shrink-0" />
            <span>
              <strong>Producción: {product.productionDays}</strong>
              <span className="block text-tinta-suave">Cada pieza se hace a pedido, especialmente para ti.</span>
            </span>
          </li>
          <li className="flex gap-3 p-4">
            <IconTruck className="h-5 w-5 shrink-0" />
            <span>
              <strong>Envío a todo Chile desde {formatCLP(site.shipping.courierBaseRate)}</strong>
              <span className="block text-tinta-suave">Gratis en compras sobre {formatCLP(site.shipping.freeShippingThreshold)}. {site.shipping.courierNote}</span>
            </span>
          </li>
          <li className="flex gap-3 p-4">
            <IconPin className="h-5 w-5 shrink-0" />
            <span>
              <strong>Retiro gratis en {site.location.city}</strong>
              <span className="block text-tinta-suave">Coordinamos día y hora por WhatsApp.</span>
            </span>
          </li>
        </ul>

        <div className="mt-10">
          <h2 className="font-display text-2xl font-bold">Lo que tienes que saber</h2>
          <div className="mt-3 space-y-3 text-lg leading-relaxed text-tinta-suave">
            {product.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <h3 className="mt-6 font-semibold">Detalles y cuidados</h3>
          <ul className="mt-3 space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2.5">
                <IconCheck className="mt-1 h-4 w-4 shrink-0 text-verde" strokeWidth={2.5} />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
