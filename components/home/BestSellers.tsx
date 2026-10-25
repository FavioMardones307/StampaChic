"use client";

import { useRef } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";

export function ProductCarousel({ products, label }: { products: Product[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <div className="relative" role="region" aria-roledescription="carrusel" aria-label={label}>
      <ul ref={ref} className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:px-0">
        {products.map((p) => (
          <li key={p.slug} className="w-[68%] shrink-0 snap-start sm:w-[40%] lg:w-[calc(25%-12px)]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      <div className="mt-6 hidden justify-end gap-2 sm:flex">
        <button type="button" onClick={() => scroll(-1)} aria-label="Ver anteriores" className="flex h-11 w-11 items-center justify-center rounded-full border border-linea bg-white hover:border-tinta">
          <IconChevronLeft />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Ver siguientes" className="flex h-11 w-11 items-center justify-center rounded-full border border-linea bg-white hover:border-tinta">
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
