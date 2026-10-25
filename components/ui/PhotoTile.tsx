import Image from "next/image";
import type { MockupKind } from "@/data/products";
import { Mockup } from "@/components/product/Mockup";

/** Foto real si existe "src"; si no, ilustración de muestra. */
export function PhotoTile({ src, alt, tint, kind, seed = 1, sizes = "33vw", text }: { src: string; alt: string; tint: string; kind: MockupKind; seed?: number; sizes?: string; text?: string }) {
  if (src) return <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />;
  return <Mockup kind={kind} background={tint} seed={seed} title={alt} text={text} color={seed % 3 === 0 ? "#1D1B20" : "#FFFFFF"} className="h-full w-full" />;
}
