import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Splash } from "@/components/ui/Splash";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <div className="relative h-40 w-40">
        <Splash seed={23} color="var(--color-magenta)" className="absolute inset-0" />
        <span className="font-display absolute inset-0 flex items-center justify-center text-5xl font-bold text-white">404</span>
      </div>
      <h1 className="font-display mt-8 text-4xl font-bold">Esta página se nos manchó</h1>
      <p className="mt-3 max-w-md text-tinta-suave">No encontramos lo que buscabas. Puede que el link haya cambiado.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/tienda">Ir a la tienda</ButtonLink>
        <ButtonLink href="/" variant="outline">Volver al inicio</ButtonLink>
      </div>
    </Container>
  );
}
