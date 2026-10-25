import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { QuoteForm, type QuoteField } from "@/components/forms/QuoteForm";
import { Container, PageHero } from "@/components/ui/Section";
import { Mockup } from "@/components/product/Mockup";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = pageMeta(
  "Personaliza el tuyo",
  "Estampados personalizados en Machalí: poleras, polerones, tazones y más con tu foto, tu logo o tu frase. Te ayudamos con el diseño sin costo extra.",
  "/personaliza",
);

const IDEAS = [
  { title: "Tu foto", text: "Ese recuerdo que quieres ver todos los días, en un tazón, una polera o un cojín.", kind: "tazon" as const, text2: "❤" },
  { title: "Tu logo", text: "Para tu emprendimiento, tu equipo o tu evento. Te asesoramos con tamaños y ubicación.", kind: "jockey" as const, text2: "LOGO" },
  { title: "Tu frase", text: "El chiste interno, el mantra o el nombre de tu peque, con la tipografía que elijas.", kind: "polera" as const, text2: "Ser feliz" },
  { title: "Un diseño desde cero", text: "¿Tienes solo una idea? La dibujamos contigo hasta que quede como la imaginaste.", kind: "tote" as const, text2: "Tu idea" },
];

const STEPS = [
  { t: "Cuéntanos tu idea", d: "Completa el formulario o escríbenos por WhatsApp con fotos y referencias." },
  { t: "Te enviamos la propuesta", d: "En menos de 24 horas hábiles recibes un boceto y el precio final." },
  { t: "Apruebas y estampamos", d: "Ajustamos lo que quieras. Recién con tu visto bueno, producimos." },
  { t: "Lo recibes", d: "Por courier a todo Chile o retiro gratis en Machalí." },
];

const FIELDS: QuoteField[] = [
  { name: "nombre", label: "Tu nombre", type: "text", required: true },
  { name: "telefono", label: "Teléfono", type: "tel", required: true, placeholder: "+56 9 1234 5678" },
  {
    name: "producto",
    label: "Tipo de producto",
    type: "select",
    required: true,
    options: ["Poleras", "Polerones", "Jockeys", "Tazones", "Botellas", "Tote bags", "Estuches o cosmetiqueros", "Pack de regalo", "Otro"],
  },
  { name: "cantidad", label: "Cantidad", type: "number", required: true, placeholder: "Ej: 12" },
  { name: "fecha", label: "Fecha en que lo necesitas", type: "date", hint: "Así te confirmamos si alcanzamos." },
  { name: "tallas", label: "Tallas y colores", type: "text", placeholder: "Ej: 4 M negras, 2 L blancas" },
  { name: "idea", label: "Cuéntanos tu idea", type: "textarea", required: true, placeholder: "Qué quieres estampar, dónde va el diseño, colores, para qué ocasión…" },
  { name: "diseno", label: "Tu diseño o referencia", type: "file" },
];

export default function Personaliza() {
  return (
    <>
      <PageHero
        title="Si lo imaginas, lo estampamos"
        intro="Diseños a medida para regalar, para tu marca o para ti. Tú pones la idea; nosotras el diseño, la técnica y el cariño en cada detalle."
      >
        <ButtonLink href="#cotizar" size="lg">Cotiza tu diseño</ButtonLink>
      </PageHero>

      <section className="py-16 sm:py-20" aria-labelledby="ideas">
        <Container>
          <h2 id="ideas" className="font-display text-[2rem] font-bold sm:text-5xl">¿Qué quieres estampar?</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IDEAS.map((i, n) => (
              <li key={i.title} className="overflow-hidden rounded-[var(--radius-card)] border border-linea bg-white">
                <div className="aspect-[4/3]">
                  <Mockup kind={i.kind} text={i.text2} seed={n + 4} background={["#FCE3EE", "#DDF1F7", "#FFF1C7", "#E3F4EA"][n]} className="h-full w-full" title={i.title} />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold">{i.title}</h3>
                  <p className="mt-1.5 text-tinta-suave">{i.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-tinta-suave">
            Trabajamos con DTF (colores vivos y flexibles en textil), sublimación (tazones, botellas y telas claras) y vinilo textil (textos y logos de alta duración). Te recomendamos la mejor técnica según tu diseño y producto.
          </p>
        </Container>
      </section>

      <section className="bg-tinta py-16 text-white sm:py-20" aria-labelledby="proceso">
        <Container>
          <h2 id="proceso" className="font-display text-[2rem] font-bold sm:text-5xl">Cómo trabajamos tu diseño</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <span className="font-display ink-inverse text-6xl font-bold" aria-hidden>{i + 1}</span>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-1.5 text-white/75">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="cotizar" className="scroll-mt-24 py-16 sm:py-20" aria-labelledby="cotizar-titulo">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="cotizar-titulo" className="font-display text-[2rem] font-bold sm:text-5xl">Cotiza tu diseño</h2>
            <p className="mt-4 text-lg leading-relaxed text-tinta-suave">
              Cuéntanos qué tienes en mente. Te respondemos por WhatsApp con una propuesta y el precio final, sin compromiso.
            </p>
            <p className="mt-4 text-tinta-suave">¿Son más de 10 unidades? Revisa los descuentos de <Link className="font-semibold text-tinta underline underline-offset-4" href="/empresas">Empresas y Colegios</Link>.</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-algodon p-5 sm:p-8">
            <QuoteForm title="Cotización de diseño personalizado" fields={FIELDS} submitLabel="Enviar cotización por WhatsApp" />
          </div>
        </Container>
      </section>
    </>
  );
}
