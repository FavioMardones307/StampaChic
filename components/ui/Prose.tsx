import type { ReactNode } from "react";

/** Estilo para páginas de texto (políticas, términos, etc.) */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-tinta-suave [&_a]:font-semibold [&_a]:text-tinta [&_a]:underline [&_h2]:font-display [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-tinta [&_li]:pl-1 [&_strong]:text-tinta [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
      {children}
    </div>
  );
}
