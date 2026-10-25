import { site } from "@/config/site";
import { testimonials } from "@/data/testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";

export function Testimonials() {
  const showExamples = site.reviewMode || process.env.NODE_ENV !== "production";
  const list = testimonials.filter((t) => !t.example || showExamples);

  return (
    <section className="bg-algodon py-16 sm:py-24" aria-labelledby="testimonios">
      <Container>
        <SectionHeading title={<span id="testimonios">Lo que dicen quienes ya tienen el suyo</span>} />
        {list.length > 0 ? (
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {list.map((t, i) => (
              <li key={i} className="relative flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-suave)]">
                {t.example && (
                  <span className="mb-3 self-start rounded-full border border-dashed border-oro px-2 py-0.5 text-xs text-tinta-suave">
                    Ejemplo: reemplazar por testimonio real
                  </span>
                )}
                <span className="font-display text-5xl leading-none text-magenta" aria-hidden>
                  “
                </span>
                <blockquote className="mt-1 flex-1 text-lg leading-relaxed">{t.text}</blockquote>
                <p className="mt-5 text-sm">
                  <strong>{t.name}</strong>, {t.place}
                  <span className="block text-tinta-suave">Compró: {t.product}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-[var(--radius-card)] bg-white p-8 sm:p-10">
            <p className="max-w-xl text-lg leading-relaxed text-tinta-suave">
              ¿Ya tienes tu StampaChic? Compártelo en Instagram y etiquétanos en {site.social.instagramHandle}. Tu foto puede aparecer aquí.
            </p>
            <ButtonLink href={site.social.instagram} target="_blank" rel="noopener noreferrer" variant="dark" className="mt-6">
              Etiquétanos en Instagram
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
