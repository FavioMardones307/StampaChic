import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/config/site";

/**
 * Mientras site.comingSoon.enabled sea true, quien entre por stampachic.cl
 * ve la página "Muy pronto" (/pronto), sin importar la dirección que escriba.
 * En stampachic.vercel.app la tienda se ve completa.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const domains: readonly string[] = site.comingSoon.domains;
  if (!site.comingSoon.enabled || !domains.includes(host)) return NextResponse.next();
  if (request.nextUrl.pathname === "/pronto") return NextResponse.next();
  return NextResponse.rewrite(new URL("/pronto", request.url));
}

export const config = {
  // No toca archivos internos, imágenes, íconos ni la imagen para compartir links
  matcher: ["/((?!_next/|brand/|productos/|instagram/|estampa-bar/|icon|apple-icon|opengraph-image|twitter-image|robots.txt|sitemap.xml).*)"],
};
