import { volumeDiscounts } from "@/data/content";
import { pageMeta } from "@/lib/seo";
import { QuoteForm, type QuoteField } from "@/components/forms/QuoteForm";
import { ButtonLink } from "@/components/ui/Button";
import { Mockup } from "@/components/product/Mockup";
import { Container, PageHero, ReviewNote } from "@/components/ui/Section";

export const metadata = pageMeta(
  "Empresas y Colegios",
  "Poleras con logo, polerones de generación, uniformes y merchandising para empresas y colegios en Rancagua, Machalí y todo Chile. Descuentos por volumen.",
  "/empresas",
);

const SERVICES = [
  { t: "Uniformes y ropa de trabajo", d: "Poleras, polerones y jockeys con el logo de tu empresa, cómodos para todo el día.", kind: "polera" as const, text: "LOGO" },
  { t: "Polerones de generación", d: "El clásico de 4° medio y de egreso, con nombres y diseño exclusivo del curso.", kind: "poleron" as const, text: "GEN 2026" },
  { t: "Merchandising y regalos", d: "Tazones, botellas y tote bags para clientes, eventos, aniversarios y onboarding.", kind: "tazon" as const, text: "Tu marca" },
  { t: "Packs para fechas especiales", d: "Día del TENS, del Profesor, de la Secretaria, Navidad: un detalle para cada persona del equipo.", kind: "tote" as const, text: "Gracias" },
];

const FIELDS: QuoteField[] = [
  { name: "institucion", label: "Empresa o colegio", type: "text", required: true },
  { name: "contacto", label: "Nombre de contacto", type: "text", required: true },
  { name: "telefono", label: "Teléfono", type: "tel", required: true, placeholder: "+56 9 1234 5678" },
  { name: "email", label: "Correo", type: "email" },
  { name: "producto", label: "Producto", type: "select", required: true, options: ["Poleras", "Polerones", "Jockeys", "Tazones", "Botellas", "Tote bags", "Packs de regalo", "Varios"] },
  { name: "cantidad", label: "Cantidad aproximada", type: "number", required: true, placeholder: "Ej: 40" },
  { name: "fecha", label: "Fecha de entrega", type: "date" },
  { name: "factura", label: "¿Necesitas factura?", type: "select", options: ["Sí", "No"] },
  { name: "detalle", label: "Detalle del pedido", type: "textarea", placeholder: "Tallas, colores, ubicación del logo, presupuesto aproximado…" },
  { name: "logo", label: "Tu logo", type: "file" },
];

export default function Empresas() {
  return (
    <>
      <PageHero
        title="Tu equipo, con tu identidad"
        intro="Prendas y merchandising con tu logo para empresas, colegios, clubes y emprendimientos. Muestra digital antes de producir, factura y descuentos por volumen."
      >
        <ButtonLink href="#cotizar" size="lg">Cotiza para tu equipo</ButtonLink>
      </PageHero>

      <section className="py-16 sm:py-20" aria-labelledby="servicios">
        <Container>
          <h2 id="servicios" className="font-display text-[2rem] font-bold sm:text-5xl">Lo que hacemos por volumen</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <li key={s.t} className="flex items-center gap-5 rounded-[var(--radius-card)] border border-linea bg-white p-4 sm:p-5">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
                  <Mockup kind={s.kind} text={s.text} seed={i + 7} color={i % 2 ? "#23305B" : "#FFFFFF"} background={["#DDF1F7", "#FCE3EE", "#FFF1C7", "#E3F4EA"][i]} className="h-full w-full" title={s.t} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{s.t}</h3>
                  <p className="mt-1.5 text-tinta-suave">{s.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-algodon py-16 sm:py-20" aria-labelledby="descuentos">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 id="descuentos" className="font-display text-[2rem] font-bold sm:text-5xl">Mientras más, mejor precio</h2>
            <p className="mt-4 text-lg leading-relaxed text-tinta-suave">
              Descuentos sobre el precio de catálogo, por producto y diseño. Pedido mínimo de 10 unidades.
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-linea bg-white">
              <table className="w-full text-left">
                <caption className="sr-only">Descuentos por cantidad</caption>
                <thead className="bg-tinta text-white">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Cantidad</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Descuento</th>
                    <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">Ideal para</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-linea">
                  {volumeDiscounts.map((d) => (
                    <tr key={d.range}>
                      <th scope="row" className="px-5 py-4 font-semibold">{d.range}</th>
                      <td className="px-5 py-4 font-display text-xl font-bold text-magenta">{d.discount}</td>
                      <td className="hidden px-5 py-4 text-tinta-suave sm:table-cell">{d.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <ReviewNote>Ajusta los tramos y porcentajes en data/content.ts.</ReviewNote>
            </div>
          </div>
        </Container>
      </section>

      <section id="cotizar" className="scroll-mt-24 py-16 sm:py-20" aria-labelledby="cotizar-emp">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="cotizar-emp" className="font-display text-[2rem] font-bold sm:text-5xl">Pide tu cotización</h2>
            <p className="mt-4 text-lg leading-relaxed text-tinta-suave">Te respondemos en menos de 24 horas hábiles con propuesta visual, precio y plazo.</p>
            <ul className="mt-6 space-y-2 text-tinta-suave">
              <li>Muestra digital sin costo antes de producir</li>
              <li>Emitimos factura</li>
              <li>Despacho a todo Chile</li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] bg-algodon p-5 sm:p-8">
            <QuoteForm title="Cotización Empresas y Colegios" fields={FIELDS} submitLabel="Enviar cotización por WhatsApp" />
          </div>
        </Container>
      </section>
    </>
  );
}
