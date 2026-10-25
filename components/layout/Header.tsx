"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/config/site";
import { cartCount, useCart } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";
import { waLink } from "@/lib/whatsapp";
import { IconBag, IconClose, IconMenu, IconSearch, IconWhatsApp } from "@/components/ui/Icons";
import { Logo } from "./Logo";
import { SearchForm } from "./SearchForm";

function CartButton() {
  const items = useCart((s) => s.items);
  const bump = useCart((s) => s.bump);
  const open = useCart((s) => s.open);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(items) : 0;
  return (
    <button
      type="button"
      onClick={open}
      className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-algodon"
      aria-label={`Abrir carrito, ${count} ${count === 1 ? "producto" : "productos"}`}
    >
      <IconBag />
      {count > 0 && (
        <span
          key={bump}
          className="absolute right-0.5 top-0.5 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-magenta px-1 text-[0.7rem] font-bold text-white"
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-linea/70 bg-papel/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-1 px-2 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-algodon lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          onClick={() => setMenuOpen(true)}
        >
          <IconMenu />
        </button>

        <Logo size={40} />

        <nav aria-label="Principal" className="ml-4 hidden lg:block xl:ml-8">
          <ul className="flex items-center gap-1">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="whitespace-nowrap rounded-full px-2.5 py-2 text-[0.92rem] font-medium hover:bg-algodon xl:px-3">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <SearchForm id="buscar-desktop" className="hidden w-60 2xl:block" />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-algodon 2xl:hidden"
            aria-label="Buscar"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <IconSearch />
          </button>
          <CartButton />
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-linea/70 px-3 py-3 2xl:hidden">
          <SearchForm id="buscar-movil" autoFocus className="mx-auto max-w-xl" />
        </div>
      )}

      {/* Menú móvil */}
      <div
        id="menu-movil"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        hidden={!menuOpen}
        className="fixed inset-0 z-50 overflow-y-auto bg-tinta text-white lg:hidden"
      >
        <div className="flex h-16 items-center justify-between px-3">
          <Logo inverse size={40} />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
          >
            <IconClose />
          </button>
        </div>
        <nav aria-label="Menú móvil" className="px-6 pb-10 pt-6">
          <ul className="space-y-1">
            {[{ label: "Inicio", href: "/" }, ...mainNav].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display block py-2 text-[2rem] font-bold hover:text-amarillo"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={waLink(`¡Hola ${site.name}! Tengo una consulta 😊`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#128C4B] px-5 py-3 font-bold"
          >
            <IconWhatsApp className="h-5 w-5" /> Escríbenos por WhatsApp
          </a>
          <p className="mt-6 text-sm text-white/60">
            Taller en {site.location.city}. Envíos a todo Chile.
          </p>
        </nav>
      </div>
    </header>
  );
}
