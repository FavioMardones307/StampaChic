/**
 * TESTIMONIOS
 * ------------------------------------------------------------
 * REEMPLAZAR con testimonios reales (con permiso de cada clienta).
 * Los que tienen `example: true` son SOLO de muestra: nunca se muestran
 * en el sitio publicado (salvo que actives reviewMode en config/site.ts).
 * Cuando agregues uno real, escribe `example: false`.
 */
export type Testimonial = { name: string; place: string; text: string; product: string; example: boolean };

export const testimonials: Testimonial[] = [
  // REEMPLAZAR con testimonios reales
  {
    name: "Nombre de clienta",
    place: "Rancagua",
    product: "Pack Día del TENS",
    text: "Ejemplo: Encargué los packs para todo mi equipo y llegaron preciosos, con cada nombre perfecto. ¡Las chiquillas felices!",
    example: true,
  },
  // REEMPLAZAR con testimonios reales
  {
    name: "Nombre de clienta",
    place: "Machalí",
    product: "Estampa Bar",
    text: "Ejemplo: El Estampa Bar fue lo mejor del cumpleaños. Los niños eligieron su diseño y se fueron felices con su polera.",
    example: true,
  },
  // REEMPLAZAR con testimonios reales
  {
    name: "Nombre de clienta",
    place: "Santiago",
    product: "Polerón Iniciales",
    text: "Ejemplo: Lo regalé para el cumpleaños de mi pareja y la calidad es increíble. Llegó rapidísimo a Santiago.",
    example: true,
  },
];
