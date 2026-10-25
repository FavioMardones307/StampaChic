import { estampaBarGallery } from "@/data/content";
import { JsonLd, pageMeta } from "@/lib/seo";
import { QuoteForm, type QuoteField } from "@/components/forms/QuoteForm";
import { ButtonLink } from "@/components/ui/Button";
import { Faq, faqLd, type FaqItem } from "@/components/ui/Faq";
import { IconCheck } from "@/components/ui/Icons";
import { PhotoTile } from "@/components/ui/PhotoTile";
import { Container, ReviewNote } from "@/components/ui/Section";
import { Splash } from "@/components/ui/Splash";

export const metadata = pageMeta(
  "Estampa Bar: patch bar para cumpleaños y eventos",
  "Patch bar y estampado en vivo para cumpleaños infantiles, despedidas y eventos corporativos en Machalí, Rancagua y alrededores. Cada invitado se lleva su prenda.",
  "/estampa-bar",
);

const INCLUDES = [
  "Taller móvil con prensa de estampado y una persona del equipo",
  "Catálogo de diseños y parches a elección (o temático a tu medida)",
  "Una prenda o accesorio por invitado: polera, tote bag o jockey",
  "Montaje y desmontaje de la estación, sin ensuciar",
  "Decoración de la mesa con los colores de tu evento",
];

const AUDIENCES = [
  { t: "Cumpleaños infantiles", d: "De 4 a 14 años. Cada niño elige su diseño y se lleva su polera como sorpresa.", c: "var(--color-amarillo)" },
  { t: "Despedidas y baby showers", d: "Tote bags y poleras a juego para el grupo, con frases para la ocasión.", c: "var(--color-magenta)" },
  { t: "Eventos corporativos", d: "Activaciones de marca, aniversarios y ferias con tu logo estampado en vivo.", c: "var(--color-cian-claro)" },
];

const FAQ: FaqItem[] = [
  { q: "¿Con cuánta anticipación debo reservar?", a: "Idealmente con 2 a 3 semanas. Los fines de semana se llenan rápido, así que escríbenos apenas tengas la fecha." },
  { q: "¿Cuánto dura el Estampa Bar?", a: "Un servicio estándar dura 2 horas, suficiente para grupos de hasta 25 invitados. Para grupos más grandes extendemos el tiempo." },
  { q: "¿Qué espacio necesitan?", a: "Una mesa de aprox. 2 metros y un enchufe cercano. Podemos trabajar en interior o exterior techado." },
  { q: "¿Hasta dónde se trasladan?", a: "Machalí y Rancagua sin costo de traslado. Para otras comunas de la región y Santiago, cotizamos el traslado aparte." },
  { q: "¿Las tallas se eligen el mismo día?", a: "Te pedimos un listado aproximado de tallas con una semana de anticipación, y llevamos algunas extra por si acaso." },
  { q: "¿Las tintas son seguras para niños?", a: "Sí. Usamos materiales certificados y la prensa la opera siempre una persona de nuestro equipo; los niños eligen y miran, sin tocar el calor." },
];

const FIELDS: QuoteField[] = [
  { name: "nombre", label: "Tu nombre", type: "text", required: true },
  { name: "telefono", label: "Teléfono", type: "tel", required: true, placeholder: "+56 9 1234 5678" },
  { name: "tipo", label: "Tipo de evento", type: "select", required: true, options: ["Cumpleaños infantil", "Cumpleaños adolescente o adulto", "Despedida de soltera", "Baby shower", "Evento corporativo", "Otro"] },
  { name: "fecha", label: "Fecha del evento", type: "date", required: true },
  { name: "invitados", label: "Cantidad de invitados", type: "number", required: true, placeholder: "Ej: 20" },
  { name: "comuna", label: "Comuna del evento", type: "text", required: true, placeholder: "Ej: Machalí" },
  { name: "prenda", label: "Prenda a estampar", type: "select", options: ["Poleras", "Tote bags", "Jockeys", "Mezcla", "Aún no sé"] },
  { name: "tema", label: "Temática o colores", type: "text", placeholder: "Ej: Dinosaurios, Frozen, colores pastel…" },
  { name: "mensaje", label: "Algo más que debamos saber", type: "textarea" },
];

export default function EstampaBar() {
  return (
    <>
      <section className="relative overflow-hidden bg-tinta text-white">
        <Splash seed={31} color="var(--color-magenta)" opacity={0.35} className="pointer-events-none absolute -right-20 -top-10 h-80 w-80" />
        <Splash seed={12} color="var(--color-amarillo)" opacity={0.3} className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56" />
        <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="font-display text-lg font-bold text-amarillo">Estampa Bar</p>
            <h1 className="font-display ink-inverse mt-2 text-[2.6rem] font-bold leading-[1] sm:text-6xl">
              Cada invitado diseña su recuerdo, y se lo lleva puesto
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Llevamos nuestro taller de estampado a tu cumpleaños o evento. Eligen su diseño, lo estampamos en vivo y la fiesta tiene un momento que nadie olvida.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#cotizar" size="lg">Cotiza tu evento</ButtonLink>
              <ButtonLink href="#incluye" size="lg" variant="light">Qué incluye</ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {estampaBarGallery.slice(0, 4).map((g, i) => (
              <div key={i} className={`relative aspect-square overflow-hidden rounded-[var(--radius-card)] ${i % 2 ? "translate-y-6" : ""}`}>
                <PhotoTile {...g} seed={i + 5} text={["Tomás", undefined, undefined, "Cumple 8"][i]} sizes="(min-width:1024px) 22vw, 45vw" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="incluye" className="scroll-mt-24 py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[2rem] font-bold sm:text-5xl">Qué incluye</h2>
            <ul className="mt-8 space-y-4">
              {INCLUDES.map((t) => (
                <li key={t} className="flex gap-3 text-lg">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amarillo">
                    <IconCheck className="h-4 w-4" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ReviewNote>Confirma qué incluye tu servicio, duración y zonas de cobertura.</ReviewNote>
            </div>
          </div>
          <div>
            <h2 className="font-display text-[2rem] font-bold sm:text-5xl">Para quién es</h2>
            <ul className="mt-8 space-y-4">
              {AUDIENCES.map((a) => (
                <li key={a.t} className="relative overflow-hidden rounded-[var(--radius-card)] border border-linea bg-white p-6">
                  <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: a.c }} aria-hidden />
                  <h3 className="font-display text-xl font-bold">{a.t}</h3>
                  <p className="mt-1.5 text-tinta-suave">{a.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-algodon py-16 sm:py-20" aria-labelledby="galeria">
        <Container>
          <h2 id="galeria" className="font-display text-[2rem] font-bold sm:text-5xl">Así se vive un Estampa Bar</h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {estampaBarGallery.map((g, i) => (
              <li key={i} className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
                <PhotoTile {...g} seed={i + 11} sizes="(min-width:768px) 33vw, 50vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="faq-eb">
        <Container className="max-w-4xl">
          <h2 id="faq-eb" className="font-display mb-8 text-[2rem] font-bold sm:text-5xl">Preguntas frecuentes</h2>
          <Faq items={FAQ} />
        </Container>
      </section>

      <section id="cotizar" className="scroll-mt-24 bg-tinta py-16 sm:py-20" aria-labelledby="cotizar-eb">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="text-white">
            <h2 id="cotizar-eb" className="font-display ink-inverse text-[2rem] font-bold sm:text-5xl">Cotiza tu evento</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">Cuéntanos la fecha y cuántos invitados vienen. Te enviamos la propuesta y el valor por WhatsApp.</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-papel p-5 sm:p-8">
            <QuoteForm title="Cotización Estampa Bar" fields={FIELDS} submitLabel="Cotiza tu evento por WhatsApp" />
          </div>
        </Container>
      </section>
      <JsonLd data={faqLd(FAQ)} />
    </>
  );
}
