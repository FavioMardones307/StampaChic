import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { title: "Elige tu producto", text: "Polera, polerón, tazón, tote bag o un pack listo para regalar. Tú eliges la base, la talla y el color." },
  { title: "Sube tu diseño o elige uno nuestro", text: "Escribe tu frase, sube tu foto o logo, o cuéntanos tu idea y la diseñamos contigo sin costo extra." },
  { title: "Lo recibes en tu casa", text: "Lo estampamos a mano en Machalí y te lo enviamos a cualquier comuna de Chile, o lo retiras gratis." },
];

export function HowItWorks() {
  return (
    <section className="border-y border-linea bg-white py-16 sm:py-24" aria-labelledby="como-funciona">
      <Container>
        <SectionHeading title={<span id="como-funciona">Así de fácil es tener el tuyo</span>} />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 120}>
                <span className="font-display ink block text-7xl font-bold text-tinta" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="font-display mt-4 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-tinta-suave">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
