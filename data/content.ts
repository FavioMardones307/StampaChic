/**
 * Textos y fotos de secciones especiales.
 * Para usar FOTOS REALES: súbelas a la carpeta indicada y escribe su ruta en "src".
 * Si "src" está vacío, se muestra una ilustración de muestra.
 */

/** Galería del Estampa Bar → fotos en /public/estampa-bar/ */
export const estampaBarGallery: { src: string; alt: string; tint: string; kind: "polera" | "tote" | "jockey" | "poleron" }[] = [
  { src: "", alt: "Niños eligiendo sus diseños en el Estampa Bar", tint: "#FCE3EE", kind: "polera" },
  { src: "", alt: "Prenda recién estampada en vivo", tint: "#DDF1F7", kind: "tote" },
  { src: "", alt: "Mesa de diseños y parches del Estampa Bar", tint: "#FFF1C7", kind: "jockey" },
  { src: "", alt: "Cumpleañera con su polera personalizada", tint: "#E3F4EA", kind: "polera" },
  { src: "", alt: "Estampa Bar en evento corporativo", tint: "#FDE6D8", kind: "poleron" },
  { src: "", alt: "Grupo de amigas con sus tote bags", tint: "#FCE3EE", kind: "tote" },
];

/** Feed de Instagram → fotos en /public/instagram/ (cuadradas, 1080×1080) */
export const instagramPosts: { src: string; alt: string; tint: string; kind: "polera" | "tazon" | "tote" | "botella" | "jockey" | "cosmetiquero" }[] = [
  { src: "", alt: "Publicación de Instagram: polera personalizada", tint: "#FCE3EE", kind: "polera" },
  { src: "", alt: "Publicación de Instagram: tazón con foto", tint: "#DDF1F7", kind: "tazon" },
  { src: "", alt: "Publicación de Instagram: tote bag", tint: "#FFF1C7", kind: "tote" },
  { src: "", alt: "Publicación de Instagram: botella con nombre", tint: "#E3F4EA", kind: "botella" },
  { src: "", alt: "Publicación de Instagram: jockey con logo", tint: "#FDE6D8", kind: "jockey" },
  { src: "", alt: "Publicación de Instagram: cosmetiquero", tint: "#FCE3EE", kind: "cosmetiquero" },
];

/** Tabla de descuentos por volumen (Empresas y Colegios) — AJUSTAR */
export const volumeDiscounts = [
  { range: "10 a 24 unidades", discount: "5%", note: "Ideal para equipos pequeños" },
  { range: "25 a 49 unidades", discount: "10%", note: "Cursos y generaciones" },
  { range: "50 a 99 unidades", discount: "15%", note: "Empresas y eventos" },
  { range: "100 o más", discount: "Cotización especial", note: "Te armamos una propuesta a medida" },
];
