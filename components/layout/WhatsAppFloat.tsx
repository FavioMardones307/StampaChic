import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { IconWhatsApp } from "@/components/ui/Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(`¡Hola ${site.name}! Tengo una consulta 😊`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#128C4B] text-white shadow-[var(--shadow-alta)] transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <IconWhatsApp width={30} height={30} />
    </a>
  );
}
