"use client";

import { useRef } from "react";
import { sizeGuides } from "@/data/size-guide";
import { IconClose, IconRuler } from "@/components/ui/Icons";

export function SizeGuide({ type }: { type: keyof typeof sizeGuides }) {
  const ref = useRef<HTMLDialogElement>(null);
  const g = sizeGuides[type];
  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-magenta">
        <IconRuler className="h-4 w-4" /> Guía de tallas
      </button>
      <dialog
        ref={ref}
        aria-labelledby="guia-titulo"
        onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
        className="m-auto w-[min(92vw,32rem)] rounded-[var(--radius-card)] bg-papel p-0 text-tinta shadow-[var(--shadow-alta)] backdrop:bg-tinta/50"
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 id="guia-titulo" className="font-display text-2xl font-bold">{g.title}</h2>
            <button type="button" onClick={() => ref.current?.close()} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-algodon" aria-label="Cerrar guía de tallas">
              <IconClose />
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Medidas en centímetros</caption>
              <thead>
                <tr className="border-b border-linea">
                  {g.columns.map((c) => (
                    <th key={c} scope="col" className="py-2 pr-3 font-semibold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.rows.map((r) => (
                  <tr key={r[0]} className="border-b border-linea/60">
                    {r.map((v, i) => (i === 0 ? <th key={i} scope="row" className="py-2 pr-3 font-bold">{v}</th> : <td key={i} className="py-2 pr-3 tabular-nums">{v}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-tinta-suave">Medidas en centímetros. {g.tip}</p>
        </div>
      </dialog>
    </>
  );
}
