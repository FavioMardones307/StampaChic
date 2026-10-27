import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Splash } from "@/components/ui/Splash";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-20 text-center">
      <Link href="/" aria-label={`${site.name}, ir al inicio`}>
        <Image src={site.logo} alt="" width={72} height={72} />
      </Link>
      <div className="relative mt-10 h-40 w-40">
        <Splash seed={23} color="var(--color-magenta)" className="absolute inset-0" />
        <span className="font-display absolute inset-0 flex items-center justify-center text-5xl font-bold text-white">404</span>
      </div>
      <h1 className="font-display mt-8 text-4xl font-bold">Esta página se nos manchó</h1>
      <p className="mt-3 max-w-md text-tinta-suave">No encontramos lo que buscabas. Puede que el link haya cambiado.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/tienda">Ir a la tienda</ButtonLink>
        <ButtonLink href="/" variant="outline">Volver al inicio</ButtonLink>
      </div>
    </main>
  );
}
