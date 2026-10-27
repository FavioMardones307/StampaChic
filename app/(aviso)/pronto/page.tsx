import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/Button";
import { IconInstagram, IconWhatsApp } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Muy pronto` },
  description: "Estamos trabajando para entregarte muy pronto los mejores productos personalizados. Poleras, polerones, tazones y regalos hechos a mano en Machalí.",
  alternates: { canonical: "/" },
};

// Luces de colores de fondo, como la salpicadura del logo
const GLOWS = [
  { c: "#9b2fd6", cls: "-left-32 -top-32 h-[28rem] w-[28rem]" },
  { c: "#d6136f", cls: "-right-24 top-1/4 h-[24rem] w-[24rem]" },
  { c: "#1fb5ff", cls: "-bottom-40 left-1/4 h-[26rem] w-[26rem]" },
  { c: "#ffd400", cls: "-bottom-24 -right-16 h-[18rem] w-[18rem]" },
];

export default function Pronto() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-5 py-12 text-center text-white">
      {GLOWS.map((g) => (
        <span key={g.c} className={`pointer-events-none absolute rounded-full opacity-35 blur-[110px] ${g.cls}`} style={{ background: g.c }} aria-hidden />
      ))}

      <div className="relative flex max-w-2xl flex-col items-center">
        <Image src={site.logo} alt={`${site.name}: ${site.slogan}`} width={260} height={260} priority className="h-auto w-48 sm:w-64" />

        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#f2c75c]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#f2c75c]" aria-hidden />
          Muy pronto
        </p>

        <h1 className="font-display mt-5 text-[2.3rem] font-bold leading-[1.05] sm:text-6xl">
          Estamos trabajando para entregarte pronto los mejores productos
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
          Poleras, polerones, tazones y regalos personalizados, hechos a mano en {site.location.city}. Mientras tanto, haz tu pedido por WhatsApp o síguenos en Instagram.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href={waLink(`¡Hola ${site.name}! 👋 Quiero hacer un pedido`)} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "lg")}>
            <IconWhatsApp className="h-5 w-5" /> Haz tu pedido por WhatsApp
          </a>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={buttonClass("outline", "lg", "!border-white/30 !bg-transparent !text-white hover:!border-white")}>
            <IconInstagram className="h-5 w-5" /> Síguenos en Instagram
          </a>
        </div>
      </div>

      <footer className="relative mt-14 text-sm text-white/50">
        {site.location.city}, Chile · Envíos a todo Chile ·{" "}
        <a href={`mailto:${site.contact.email}`} className="underline-offset-4 hover:text-white hover:underline">
          {site.contact.email}
        </a>
      </footer>
    </main>
  );
}
