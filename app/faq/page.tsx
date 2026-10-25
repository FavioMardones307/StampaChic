import Link from "next/link";
import { site } from "@/config/site";
import { formatCLP } from "@/lib/format";
import { JsonLd, pageMeta } from "@/lib/seo";
import { Faq, faqLd, type FaqItem } from "@/components/ui/Faq";
import { Container, PageHero, ReviewNote } from "@/components/ui/Section";

export const metadata = pageMeta("Preguntas frecuentes", "Plazos de producción, envíos, pagos, personalización y cuidados de tus productos StampaChic.", "/faq");

// REVISAR: respuestas base. Ajústalas a cómo trabajas realmente.
const ITEMS: FaqItem[] = [
  { q: "¿Cuánto se demora mi pedido?", a: `La mayoría de los productos se producen en ${site.shipping.defaultProductionDays}. Cada ficha indica su plazo. A eso se suma el tiempo del courier (1 a 4 días hábiles según tu comuna).` },
  { q: "¿Cómo pago?", a: "Confirmas tu pedido por WhatsApp y te enviamos los datos para pagar por transferencia, o un link de pago con débito o crédito. Comenzamos la producción cuando el pago está confirmado." },
  { q: "¿Puedo ver el diseño antes de que lo estampen?", a: "Sí, siempre. Te enviamos una vista previa por WhatsApp y no estampamos nada hasta que lo apruebes." },
  { q: "¿Qué tipo de imagen debo enviar?", a: "Mientras más calidad, mejor: idealmente PNG con fondo transparente o una foto nítida. Si tu imagen no sirve, te avisamos y te ayudamos a mejorarla." },
  { q: "¿Hacen envíos a regiones?", a: `Sí, enviamos a todo Chile por Starken o Chilexpress. El envío es gratis en compras sobre ${formatCLP(site.shipping.freeShippingThreshold)}.` },
  { q: "¿Puedo retirar en persona?", a: `Sí, el retiro en ${site.location.city} es gratis. Coordinamos día y hora por WhatsApp.` },
  { q: "¿Cómo cuido mi prenda estampada?", a: "Lava al revés, en agua fría y sin cloro. No uses secadora ni planches directamente sobre el estampado. Así dura muchísimo más." },
  { q: "¿Hacen pedidos por cantidad?", a: "Sí, con descuentos desde 10 unidades. Revisa la sección Empresas y Colegios o escríbenos." },
];

export default function FaqPage() {
  return (
    <>
      <PageHero title="Preguntas frecuentes" intro="Si no encuentras tu respuesta, escríbenos por WhatsApp. Respondemos rápido." />
      <Container className="max-w-4xl py-14 sm:py-20">
        <Faq items={ITEMS} />
        <p className="mt-8 text-tinta-suave">
          ¿Más dudas? Revisa <Link href="/envios" className="font-semibold text-tinta underline">envíos</Link> y <Link href="/cambios-y-devoluciones" className="font-semibold text-tinta underline">cambios y devoluciones</Link>.
        </p>
        <div className="mt-8"><ReviewNote>Revisa estas respuestas para que coincidan con tu forma de trabajar.</ReviewNote></div>
      </Container>
      <JsonLd data={faqLd(ITEMS)} />
    </>
  );
}
