import Image from "next/image";
import { getCategory, type Product } from "@/data/products";
import { Mockup, PackMockup } from "./Mockup";

type Props = {
  product: Product;
  /** Índice de la foto real (si existen fotos en product.images) */
  index?: number;
  /** Color a mostrar en el dibujo de muestra */
  color?: string;
  text?: string;
  image?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Muestra la foto real del producto si existe; si no, un dibujo de muestra
 * con los colores de la marca. Para usar fotos reales, agrégalas en
 * data/products.ts → campo "images".
 */
export function ProductVisual({ product, index = 0, color, text, image, sizes = "(min-width: 1024px) 25vw, 50vw", priority, className }: Props) {
  const photo = product.images[index];
  if (photo) {
    return (
      <Image
        src={photo}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }
  const tint = getCategory(product.categories[0])?.tint;
  const seed = product.slug.length + index;
  if (product.packItems) {
    return <PackMockup items={product.packItems} background={tint} text={text} seed={seed} title={product.name} className={`h-full w-full ${className ?? ""}`} />;
  }
  return (
    <Mockup
      kind={product.mockup}
      color={color ?? product.colors?.[0]?.hex}
      background={tint}
      text={text}
      image={image}
      seed={seed}
      title={product.name}
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
