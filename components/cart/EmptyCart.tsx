import { Splash } from "@/components/ui/Splash";
import { ButtonLink } from "@/components/ui/Button";

export function EmptyCart({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="relative h-36 w-36">
        <Splash seed={11} color="var(--color-amarillo)" className="absolute inset-0" />
        <Splash seed={4} color="var(--color-magenta)" className="absolute inset-6 opacity-90 mix-blend-multiply" />
      </div>
      <h2 className="font-display mt-6 text-2xl font-bold">Tu carrito está esperando su primer diseño</h2>
      <p className="mt-2 max-w-xs text-tinta-suave">Elige un producto, ponle tu nombre o tu logo y lo estampamos a mano para ti.</p>
      <ButtonLink href="/tienda" className="mt-6" onClick={onNavigate}>
        Descubre la tienda
      </ButtonLink>
    </div>
  );
}
