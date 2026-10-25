"use client";

import { useRef, useState, type ReactNode } from "react";
import { IconClose } from "@/components/ui/Icons";

type View = { key: string; label: string; node: ReactNode };

/** Galería con miniaturas, zoom al pasar el mouse y vista ampliada al tocar. */
export function Gallery({ views, active, onChange }: { views: View[]; active: number; onChange: (i: number) => void }) {
  const [origin, setOrigin] = useState("50% 50%");
  const [zoom, setZoom] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = views[active] ?? views[0];

  return (
    <div className="lg:sticky lg:top-24">
      <button
        type="button"
        className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] bg-algodon"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        onClick={() => dialog.current?.showModal()}
        aria-label={`Ampliar imagen: ${current.label}`}
      >
        <div className="h-full w-full transition-transform duration-200 ease-out" style={{ transform: zoom ? "scale(1.9)" : "none", transformOrigin: origin }}>
          {current.node}
        </div>
      </button>

      {views.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Más imágenes">
          {views.map((v, i) => (
            <li key={v.key}>
              <button
                type="button"
                onClick={() => onChange(i)}
                aria-label={`Ver ${v.label}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl border-2 ${i === active ? "border-tinta" : "border-transparent opacity-80 hover:opacity-100"}`}
              >
                {v.node}
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        aria-label={current.label}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto w-[min(94vw,85vh)] overflow-hidden rounded-[var(--radius-card)] bg-algodon p-0 backdrop:bg-tinta/80"
      >
        <div className="relative aspect-square w-full">{current.node}</div>
        <button type="button" onClick={() => dialog.current?.close()} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[var(--shadow-suave)]" aria-label="Cerrar imagen ampliada">
          <IconClose />
        </button>
      </dialog>
    </div>
  );
}
