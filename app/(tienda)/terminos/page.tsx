import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { Prose } from "@/components/ui/Prose";
import { Container, PageHero, ReviewNote } from "@/components/ui/Section";

export const metadata = pageMeta("Términos y condiciones", "Términos y condiciones de compra en StampaChic.", "/terminos");

// REVISAR: texto base. Se recomienda validarlo con un abogado.
export default function Terminos() {
  return (
    <>
      <PageHero title="Términos y condiciones" />
      <Container className="py-14 sm:py-20">
        <Prose>
          <ReviewNote>Texto base. Agrega razón social y RUT, y valídalo idealmente con asesoría legal.</ReviewNote>
          <h2>1. Sobre nosotros</h2>
          <p>Este sitio es operado por {site.name}, con domicilio en {site.location.city}, {site.location.region}, Chile. Contacto: {site.contact.email}.</p>
          <h2>2. Precios</h2>
          <p>Los precios están expresados en pesos chilenos e incluyen IVA. El costo de envío se informa antes de confirmar el pedido. Podemos actualizar precios sin aviso previo, respetando siempre el precio de los pedidos ya confirmados.</p>
          <h2>3. Proceso de compra</h2>
          <p>Al finalizar la compra se genera un pedido que confirmas por WhatsApp. El pedido queda firme cuando recibimos el pago y apruebas el diseño. Te enviaremos la boleta o factura correspondiente.</p>
          <h2>4. Diseños e imágenes</h2>
          <p>Al enviarnos una imagen o logo declaras tener derecho a usarla. No estampamos contenido que infrinja derechos de terceros, que sea ofensivo o ilegal. Podemos publicar fotos de los productos en nuestras redes, salvo que nos pidas lo contrario.</p>
          <h2>5. Colores y vista previa</h2>
          <p>Las vistas previas son referenciales. Los colores pueden variar levemente según la pantalla, el material y la técnica de estampado.</p>
          <h2>6. Datos personales</h2>
          <p>Usamos tus datos solo para gestionar tu pedido y comunicarnos contigo. No los compartimos con terceros, salvo el courier encargado del envío.</p>
          <h2>7. Cambios y devoluciones</h2>
          <p>Se rigen por nuestra política de cambios y devoluciones y por la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores.</p>
        </Prose>
      </Container>
    </>
  );
}
