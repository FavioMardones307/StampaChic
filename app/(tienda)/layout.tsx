import type { Metadata } from "next";
import { site } from "@/config/site";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CartDrawer } from "@/components/cart/CartDrawer";

// Mientras la tienda no esté lanzada, Google no la indexa
export const metadata: Metadata = site.comingSoon.enabled ? { robots: { index: false, follow: false } } : {};

/** Estructura de todas las páginas de la tienda: anuncio, menú, pie de página y carrito. */
export default function TiendaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#contenido" className="sr-only z-[60] rounded-full bg-tinta px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        Saltar al contenido
      </a>
      <AnnouncementBar />
      <Header />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </>
  );
}
