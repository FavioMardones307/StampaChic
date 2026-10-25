import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";
import { QuoteForm, type QuoteField } from "@/components/forms/QuoteForm";
import { IconClock, IconInstagram, IconMail, IconPin, IconWhatsApp } from "@/components/ui/Icons";
import { Container, PageHero } from "@/components/ui/Section";

export const metadata = pageMeta("Contacto", `Escríbenos por WhatsApp al ${site.contact.whatsappDisplay}, por correo o Instagram. Taller en Machalí, envíos a todo Chile.`, "/contacto");

const FIELDS: QuoteField[] = [
  { name: "nombre", label: "Tu nombre", type: "text", required: true },
  { name: "telefono", label: "Teléfono", type: "tel", placeholder: "+56 9 1234 5678" },
  { name: "motivo", label: "Motivo", type: "select", options: ["Consulta sobre un producto", "Estado de mi pedido", "Cotización", "Estampa Bar", "Otro"], wide: true },
  { name: "mensaje", label: "Mensaje", type: "textarea", required: true },
];

export default function Contacto() {
  const channels = [
    { Icon: IconWhatsApp, t: "WhatsApp", v: site.contact.whatsappDisplay, href: waLink(`¡Hola ${site.name}! 😊`), ext: true },
    { Icon: IconMail, t: "Correo", v: site.contact.email, href: `mailto:${site.contact.email}` },
    { Icon: IconInstagram, t: "Instagram", v: site.social.instagramHandle, href: site.social.instagram, ext: true },
    { Icon: IconPin, t: "Taller", v: `${site.location.city}, ${site.location.region}. Retiro con hora agendada.` },
    { Icon: IconClock, t: "Horario", v: site.contact.hours },
  ];
  return (
    <>
      <PageHero title="Conversemos" intro="La forma más rápida de hablar con nosotras es WhatsApp. También puedes dejarnos tu mensaje aquí." />
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.3fr]">
        <ul className="space-y-5">
          {channels.map(({ Icon, t, v, href, ext }) => (
            <li key={t} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-algodon"><Icon /></span>
              <div>
                <p className="font-bold">{t}</p>
                {href ? (
                  <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-tinta-suave underline-offset-4 hover:text-tinta hover:underline">{v}</a>
                ) : (
                  <p className="text-tinta-suave">{v}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="rounded-[var(--radius-card)] bg-algodon p-5 sm:p-8">
          <h2 className="font-display mb-6 text-2xl font-bold">Déjanos tu mensaje</h2>
          <QuoteForm title="Mensaje desde la web" fields={FIELDS} submitLabel="Enviar por WhatsApp" />
        </div>
      </Container>
    </>
  );
}
