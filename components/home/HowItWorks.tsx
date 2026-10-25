import { Container, SectionHeading } from "@/components/ui/Section";

const STEPS = [
  { title: "Elige tu producto", text: "Polera, polerón, tazón, tote bag o un pack listo para regalar. Tú eliges la base, la talla y el color." },
  { title: "Sube tu diseño o elige uno nuestro", text: "Escribe tu frase, sube tu foto o logo, o cuéntanos tu idea y la diseñamos contigo sin costo extra." },
  { title: "Lo recibes en tu casa", text: "Lo estampamos a mano en Machalí y te lo enviamos a cualquier comuna de Chile, o lo retiras gratis." },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="como-funciona">
      <Container>
        <SectionHeading title={<span id="como-funciona">Así de fácil es tener el tuyo</span>} />
        <ol className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-[1.5rem] bg-algodon p-6 sm:p-8">
              <span className="font-display flex h-11 w-11 items-center justify-center rounded-full bg-magenta text-lg font-semibold text-white" aria-hidden>
                {i + 1}
              </span>
              <h3 className="font-display mt-10 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-tinta-suave">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
