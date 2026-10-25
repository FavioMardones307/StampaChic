import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Container, PageHero, ReviewNote } from "@/components/ui/Section";
import { PhotoTile } from "@/components/ui/PhotoTile";
import { Splash } from "@/components/ui/Splash";

export const metadata = pageMeta(
  "Nosotros",
  "Somos StampaChic, un taller de estampados personalizados en Machalí. Conoce nuestra historia, nuestros valores y cómo hacemos cada pieza a mano.",
  "/nosotros",
);

const VALUES = [
  { t: "Detalle", d: "Revisamos cada pieza antes de entregarla. Si no nos encanta a nosotras, no sale del taller.", c: "var(--color-magenta)" },
  { t: "Cercanía", d: "Hablas directo con quien diseña y estampa tu pedido. Sin intermediarios ni respuestas automáticas.", c: "var(--color-cian-claro)" },
  { t: "Identidad", d: "Creemos que lo que usas cuenta tu historia. Por eso cada diseño es tan único como tú.", c: "var(--color-amarillo)" },
];

const PROCESS = [
  { t: "Diseño", d: "Preparamos tu archivo o lo creamos desde cero, y te mostramos una vista previa para aprobar." },
  { t: "Impresión", d: "Imprimimos tu diseño en film DTF o papel de sublimación con tintas de alta calidad." },
  { t: "Estampado", d: "Transferimos el diseño con prensa térmica a la temperatura y presión justas para cada material." },
  { t: "Revisión y empaque", d: "Revisamos terminaciones, doblamos con cuidado y empacamos listo para regalar." },
];

export default function Nosotros() {
  return (
    <>
      <PageHero title="Hecho a mano, con nombre y apellido" intro={`Somos ${site.name}, un taller de estampados en ${site.location.city}. Nos dedicamos a convertir ideas en cosas que se usan, se regalan y se guardan.`} />

      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Splash seed={19} color="var(--color-amarillo)" className="absolute -left-6 -top-6 w-1/2" />
            <div className="relative h-full overflow-hidden rounded-[2rem] shadow-[var(--shadow-alta)]">
              {/* REEMPLAZAR: foto de la dueña o del taller en /public/brand/taller.jpg */}
              <PhotoTile src="" alt="Nuestro taller en Machalí" tint="#FCE3EE" kind="polera" seed={3} text="StampaChic" sizes="(min-width:1024px) 40vw, 90vw" />
            </div>
          </div>
          <div>
            <h2 className="font-display text-[2rem] font-bold sm:text-5xl">Nuestra historia</h2>
            {/* REVISAR: texto de ejemplo, reemplázalo con tu historia real */}
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-tinta-suave">
              <p>
                {site.name} nació en la mesa de la cocina, con una prensa pequeña y muchas ganas de regalar cosas que tuvieran sentido. Las primeras poleras fueron para la familia; luego llegaron las amigas, las amigas de las amigas y, de a poco, un taller propio.
              </p>
              <p>
                Hoy estampamos para mamás que organizan el cumpleaños soñado, para equipos de salud que celebran su día, para colegios, emprendimientos y para quienes simplemente quieren llevar puesto algo que diga quiénes son.
              </p>
              <p>Seguimos trabajando igual que el primer día: pieza por pieza, revisando cada detalle y conversando contigo hasta que el diseño quede como lo imaginaste.</p>
            </div>
            <div className="mt-6">
              <ReviewNote>Esta historia es un texto de ejemplo. Cuéntala con tus palabras.</ReviewNote>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-algodon py-16 sm:py-20" aria-labelledby="valores">
        <Container>
          <h2 id="valores" className="font-display text-[2rem] font-bold sm:text-5xl">Lo que nos mueve</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <li key={v.t} className="relative overflow-hidden rounded-[var(--radius-card)] bg-white p-7">
                <Splash seed={i + 40} color={v.c} className="absolute -right-8 -top-8 h-28 w-28 opacity-80" />
                <h3 className="font-display relative text-2xl font-bold">{v.t}</h3>
                <p className="relative mt-2 leading-relaxed text-tinta-suave">{v.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="proceso-artesanal">
        <Container>
          <h2 id="proceso-artesanal" className="font-display text-[2rem] font-bold sm:text-5xl">Nuestro proceso artesanal</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.t} className="border-t-4 border-tinta pt-5">
                <span className="text-sm font-bold text-magenta">Paso {i + 1}</span>
                <h3 className="font-display mt-1 text-xl font-bold">{p.t}</h3>
                <p className="mt-1.5 text-tinta-suave">{p.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tienda" size="lg">Quiero el mío</ButtonLink>
            <ButtonLink href="/personaliza" size="lg" variant="outline">Cuéntanos tu idea</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
