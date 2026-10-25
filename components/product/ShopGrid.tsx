"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { categories, products, type CategorySlug } from "@/data/products";
import { buttonClass } from "@/components/ui/Button";
import { IconSearch } from "@/components/ui/Icons";
import { Splash } from "@/components/ui/Splash";
import { ProductCard } from "./ProductCard";

type Sort = "destacados" | "novedades" | "precio-asc" | "precio-desc";
const SORTS: { value: Sort; label: string }[] = [
  { value: "destacados", label: "Destacados" },
  { value: "novedades", label: "Novedades" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
];

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function ShopGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const cat = params.get("categoria") as CategorySlug | null;
  const sort = (params.get("orden") as Sort) ?? "destacados";
  const q = params.get("q") ?? "";
  const [query, setQuery] = useState(q);

  // Si la búsqueda cambia desde afuera (ej. el buscador del header), sincronizamos el campo
  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setQuery(q);
  }

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    const qs = sp.toString();
    startTransition(() => router.replace(qs ? `/tienda?${qs}` : "/tienda", { scroll: false }));
  }

  // Búsqueda con pequeña espera mientras escribes
  useEffect(() => {
    if (query === q) return;
    const t = setTimeout(() => update({ q: query.trim() || null }), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const list = useMemo(() => {
    const nq = normalize(q.trim());
    const filtered = products.filter((p) => {
      if (cat && !p.categories.includes(cat)) return false;
      if (!nq) return true;
      const hay = normalize([p.name, p.short, ...p.categories, ...p.tags, ...p.description].join(" "));
      return nq.split(/\s+/).every((w) => hay.includes(w));
    });
    const score = (t: string[]) => (t.includes("mas-vendido") ? 2 : 0) + (t.includes("nuevo") ? 1 : 0);
    return [...filtered].sort((a, b) => {
      if (sort === "precio-asc") return a.price - b.price;
      if (sort === "precio-desc") return b.price - a.price;
      if (sort === "novedades") return b.createdAt.localeCompare(a.createdAt);
      return score(b.tags) - score(a.tags);
    });
  }, [cat, q, sort]);

  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? "border-tinta bg-tinta text-white" : "border-linea bg-white hover:border-tinta"}`;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="buscar-tienda" className="sr-only">Buscar en la tienda</label>
          <input
            id="buscar-tienda"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué estás buscando?"
            className="h-12 w-full rounded-full border border-linea bg-white pl-11 pr-4 focus:border-tinta focus:outline-none"
          />
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tinta-suave" />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="orden" className="text-sm font-semibold">Ordenar</label>
          <select
            id="orden"
            value={sort}
            onChange={(e) => update({ orden: e.target.value === "destacados" ? null : e.target.value })}
            className="h-12 flex-1 rounded-full border border-linea bg-white px-4 text-sm font-medium focus:border-tinta focus:outline-none sm:flex-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <nav aria-label="Categorías" className="no-scrollbar -mx-4 mt-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 pb-1 sm:flex-wrap">
          <li>
            <button type="button" className={chip(!cat)} aria-pressed={!cat} onClick={() => update({ categoria: null })}>Todo</button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button type="button" className={chip(cat === c.slug)} aria-pressed={cat === c.slug} onClick={() => update({ categoria: c.slug })}>
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <h2 className="sr-only">Productos</h2>
      <p className="mt-6 text-sm text-tinta-suave" aria-live="polite">
        {list.length} {list.length === 1 ? "producto" : "productos"}
        {q && <> para “{q}”</>}
      </p>

      {list.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <li key={p.slug}><ProductCard product={p} priority={i < 4} /></li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-[var(--radius-card)] bg-algodon px-6 py-14 text-center">
          <Splash seed={9} color="var(--color-cian-claro)" className="h-28 w-28" />
          <h2 className="font-display mt-4 text-2xl font-bold">No encontramos “{q || "eso"}”… todavía</h2>
          <p className="mt-2 max-w-md text-tinta-suave">
            Si lo imaginas, probablemente lo podemos estampar. Cuéntanos tu idea y te cotizamos sin compromiso.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/personaliza" className={buttonClass("primary")}>Cotiza tu idea</Link>
            <button type="button" className={buttonClass("outline")} onClick={() => { setQuery(""); update({ q: null, categoria: null }); }}>
              Ver todos los productos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Versión estática (sin filtros) mientras carga, buena para Google. */
export function ShopGridFallback() {
  return (
    <>
      <h2 className="sr-only">Productos</h2>
      <ul className="mt-[8.5rem] grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.slug}><ProductCard product={p} /></li>
        ))}
      </ul>
    </>
  );
}
