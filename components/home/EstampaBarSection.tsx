import { estampaBarGallery } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { PhotoTile } from "@/components/ui/PhotoTile";
import { Container } from "@/components/ui/Section";

export function EstampaBarSection() {
  const [a, b, c] = estampaBarGallery;
  return (
    <section className="py-16 sm:py-24" aria-labelledby="estampa-bar">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 grid grid-cols-5 grid-rows-2 gap-3 lg:order-1">
          <div className="relative col-span-3 row-span-2 aspect-[3/4] overflow-hidden rounded-[var(--radius-card)]">
            <PhotoTile {...a} seed={4} text="Martina" sizes="(min-width:1024px) 30vw, 60vw" />
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-[var(--radius-card)]">
            <PhotoTile {...b} seed={6} sizes="25vw" />
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-[var(--radius-card)]">
            <PhotoTile {...c} seed={9} sizes="25vw" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="font-display text-lg font-bold text-magenta">Estampa Bar</p>
          <h2 id="estampa-bar" className="font-display mt-2 text-[2.5rem] font-bold sm:text-6xl">
            El panorama que todos recuerdan del cumpleaños
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-tinta-suave">
            Llevamos nuestro taller a tu evento. Cada invitado elige su diseño, lo estampamos en vivo y se lleva su prenda de recuerdo.
          </p>
          <ul className="mt-6 space-y-2.5">
            {["Cumpleaños infantiles y adolescentes", "Despedidas de soltera y baby showers", "Eventos corporativos y ferias"].map((t) => (
              <li key={t} className="flex items-center gap-2.5 font-medium">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amarillo">
                  <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/estampa-bar#cotizar" size="lg">
              Cotiza tu evento
            </ButtonLink>
            <ButtonLink href="/estampa-bar" size="lg" variant="outline">
              Ver cómo funciona
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
