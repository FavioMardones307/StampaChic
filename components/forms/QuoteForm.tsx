"use client";

import { useId, useState } from "react";
import { formToMessage, waLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { IconCheck, IconUpload, IconWhatsApp } from "@/components/ui/Icons";
import { a11y, Field, inputClass } from "./Field";

export type QuoteField = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "number" | "date" | "select" | "textarea" | "file";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  /** Ocupa las dos columnas en escritorio */
  wide?: boolean;
};

/** Formulario de cotización que se envía como mensaje de WhatsApp. */
export function QuoteForm({ title, fields, submitLabel }: { title: string; fields: QuoteField[]; submitLabel: string }) {
  const uid = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string>();
  const [sent, setSent] = useState(false);

  const id = (n: string) => `${uid}-${n}`;
  const set = (n: string, v: string) => {
    setValues((p) => ({ ...p, [n]: v }));
    if (errors[n]) setErrors((p) => ({ ...p, [n]: "" }));
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    for (const f of fields) {
      if (f.required && !values[f.name]?.trim()) errs[f.name] = `Completa “${f.label.toLowerCase()}”.`;
    }
    setErrors(errs);
    const first = fields.find((f) => errs[f.name]);
    if (first) {
      document.getElementById(id(first.name))?.focus();
      return;
    }
    const msg = formToMessage(
      title,
      fields.map((f) => [f.label, f.type === "file" && values[f.name] ? `${values[f.name]} (lo adjunto en este chat)` : values[f.name]]),
    );
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const err = errors[f.name];
        const common = {
          ...a11y(id(f.name), err, f.hint),
          required: f.required,
          className: `${inputClass} ${err ? "border-magenta" : "border-linea"} ${f.type === "textarea" ? "py-3" : "h-12"}`,
        };
        return (
          <Field key={f.name} id={id(f.name)} label={f.label} error={err} hint={f.hint} optional={!f.required} className={f.wide || f.type === "textarea" || f.type === "file" ? "sm:col-span-2" : ""}>
            {f.type === "select" ? (
              <select {...common} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">Elige una opción</option>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...common} rows={4} placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
            ) : f.type === "file" ? (
              <label className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-linea bg-white px-4 py-4 text-sm font-semibold hover:border-tinta focus-within:border-tinta">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Vista previa de tu diseño" className="h-14 w-14 rounded-lg object-cover" />
                ) : (
                  <IconUpload className="h-5 w-5" />
                )}
                <span className="min-w-0 truncate">{values[f.name] || "Subir diseño o referencia (JPG, PNG)"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  id={id(f.name)}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (preview) URL.revokeObjectURL(preview);
                    setPreview(file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined);
                    set(f.name, file.name);
                  }}
                />
              </label>
            ) : (
              <input
                {...common}
                type={f.type}
                min={f.type === "number" ? 1 : undefined}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
              />
            )}
          </Field>
        );
      })}
      <div className="sm:col-span-2">
        <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto">
          <IconWhatsApp className="h-5 w-5" /> {submitLabel}
        </Button>
        <p className="mt-3 text-sm text-tinta-suave" aria-live="polite">
          {sent ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-verde">
              <IconCheck className="h-4 w-4" strokeWidth={3} /> Listo, se abrió WhatsApp con tu solicitud. Adjunta tus archivos ahí y te respondemos pronto.
            </span>
          ) : (
            "Se abrirá WhatsApp con tu solicitud lista para enviar. Respondemos en horario hábil."
          )}
        </p>
      </div>
    </form>
  );
}
