import Form from "next/form";
import { IconSearch } from "@/components/ui/Icons";

export function SearchForm({ id, className = "", autoFocus }: { id: string; className?: string; autoFocus?: boolean }) {
  return (
    <Form action="/tienda" role="search" className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        Buscar productos
      </label>
      <input
        id={id}
        name="q"
        type="search"
        autoFocus={autoFocus}
        placeholder="Busca poleras, tazones, packs…"
        className="h-11 w-full rounded-full border border-linea bg-white pl-11 pr-4 text-[0.95rem] placeholder:text-tinta-suave/70 focus:border-tinta focus:outline-none"
      />
      <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tinta-suave" />
    </Form>
  );
}
