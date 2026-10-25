import { IconChat, IconHand, IconLock, IconTruck } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";

const ITEMS = [
  { Icon: IconTruck, title: "Envíos a todo Chile", text: "De Arica a Punta Arenas, o retiro gratis en Machalí." },
  { Icon: IconLock, title: "Pago seguro", text: "Transferencia, débito o crédito. Confirmas antes de pagar." },
  { Icon: IconHand, title: "Hecho a mano en Chile", text: "Cada pieza se estampa y revisa una por una." },
  { Icon: IconChat, title: "Atención por WhatsApp", text: "Te respondemos rápido y te mostramos tu diseño antes." },
];

export function TrustBar() {
  return (
    <section aria-label="Por qué comprar en StampaChic" className="border-t border-linea bg-white py-12">
      <Container>
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-algodon text-tinta">
                <Icon />
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-tinta-suave">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
