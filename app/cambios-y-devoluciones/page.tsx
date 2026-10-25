import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { Prose } from "@/components/ui/Prose";
import { Container, PageHero, ReviewNote } from "@/components/ui/Section";

export const metadata = pageMeta("Cambios y devoluciones", "Política de cambios y devoluciones de productos personalizados StampaChic.", "/cambios-y-devoluciones");

// REVISAR: texto base. Valida con la normativa vigente (Ley 19.496 del Consumidor).
export default function Cambios() {
  return (
    <>
      <PageHero title="Cambios y devoluciones" intro="Queremos que ames lo que recibes. Esto es lo que puedes esperar si algo no sale como esperabas." />
      <Container className="py-14 sm:py-20">
        <Prose>
          <ReviewNote>Texto base. Revísalo según tu forma de trabajar y la Ley del Consumidor.</ReviewNote>
          <h2>Productos personalizados</h2>
          <p>
            Como cada producto se fabrica especialmente para ti, según tus indicaciones, no aceptamos cambios ni devoluciones por arrepentimiento, gusto o error en los datos entregados por el cliente (talla, texto, imagen). Por eso siempre te mostramos el diseño antes de estampar.
          </p>
          <h2>Si hay una falla</h2>
          <p>Si tu producto tiene una falla de fabricación o de estampado, o no corresponde a lo que aprobaste, lo reponemos sin costo. Para eso:</p>
          <ul>
            <li>Escríbenos dentro de los 10 días siguientes a la recepción.</li>
            <li>Envía fotos del producto y tu número de pedido.</li>
            <li>El producto debe estar sin uso y sin lavar.</li>
          </ul>
          <h2>Productos sin personalizar</h2>
          <p>Los productos sin personalizar pueden cambiarse por talla o modelo dentro de 10 días, sin uso y con su empaque. El costo del envío del cambio es de cargo del cliente.</p>
          <h2>Contacto</h2>
          <p>Escríbenos a <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> o por WhatsApp al {site.contact.whatsappDisplay}.</p>
        </Prose>
      </Container>
    </>
  );
}
