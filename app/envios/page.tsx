import { site } from "@/config/site";
import { formatCLP } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { Prose } from "@/components/ui/Prose";
import { Container, PageHero, ReviewNote } from "@/components/ui/Section";

export const metadata = pageMeta("Políticas de envío", "Envíos a todo Chile por courier y retiro gratis en Machalí. Plazos, costos y seguimiento.", "/envios");

// REVISAR: texto base de políticas de envío.
export default function Envios() {
  return (
    <>
      <PageHero title="Envíos" intro="Llegamos de Arica a Punta Arenas. Y si estás cerca, ven a buscarlo." />
      <Container className="py-14 sm:py-20">
        <Prose>
          <ReviewNote>Texto base. Confirma couriers, valores y plazos antes de publicar.</ReviewNote>
          <h2>Plazos</h2>
          <p>
            Cada producto se hace a pedido. El plazo de producción aparece en cada ficha (por lo general, {site.shipping.defaultProductionDays}) y comienza cuando confirmamos tu pago y apruebas el diseño. Luego, el courier se demora entre 1 y 4 días hábiles según tu comuna.
          </p>
          <h2>Costos</h2>
          <ul>
            <li>Envío por courier desde {formatCLP(site.shipping.courierBaseRate)}; el valor final depende de la comuna y el tamaño del paquete.</li>
            <li>Envío gratis en compras sobre {formatCLP(site.shipping.freeShippingThreshold)}.</li>
            <li>Retiro gratis en nuestro taller en {site.location.city}, con hora agendada.</li>
          </ul>
          <h2>Seguimiento</h2>
          <p>Cuando despachamos tu pedido te enviamos por WhatsApp el número de seguimiento para que sepas dónde viene.</p>
          <h2>Si algo pasa en el camino</h2>
          <p>Si tu pedido llega dañado, escríbenos dentro de las 48 horas siguientes con fotos del paquete y del producto. Lo solucionamos contigo.</p>
        </Prose>
      </Container>
    </>
  );
}
