import type { ReactNode } from "react";
import { site } from "@/config/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  title,
  intro,
  action,
  className = "",
  as: As = "h2",
}: {
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div className="max-w-2xl">
        <As className="font-display text-[2rem] font-bold sm:text-5xl">{title}</As>
        {intro && <p className="mt-3 text-lg leading-relaxed text-tinta-suave">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

/** Encabezado de páginas internas */
export function PageHero({ title, intro, children, tone = "light" }: { title: ReactNode; intro?: ReactNode; children?: ReactNode; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={`relative overflow-hidden ${dark ? "bg-tinta text-white" : "bg-algodon"}`}>
      <Container className="relative py-14 sm:py-20">
        <h1 className={`font-display max-w-3xl text-[2.6rem] font-bold sm:text-6xl`}>{title}</h1>
        {intro && <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/80" : "text-tinta-suave"}`}>{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}

/** Aviso visible para la dueña: texto que debe revisar antes de publicar */
export function ReviewNote({ children }: { children: ReactNode }) {
  if (!site.reviewMode && process.env.NODE_ENV === "production") return null;
  return (
    <p className="rounded-xl border border-dashed border-oro bg-amarillo/10 px-4 py-3 text-sm text-tinta-suave">
      <strong className="text-tinta">Texto base para revisar:</strong> {children}
    </p>
  );
}
