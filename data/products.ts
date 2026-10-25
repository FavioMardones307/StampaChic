/**
 * ============================================================
 *  CATÁLOGO DE PRODUCTOS DE STAMPACHIC
 * ============================================================
 *  Cada producto es un bloque entre llaves { ... }.
 *  Para AGREGAR un producto: copia un bloque completo, pégalo al final
 *  de la lista (antes del "];") y cambia sus datos.
 *  Para QUITAR un producto: borra su bloque completo (desde "{" hasta "},").
 *
 *  Campos de cada producto:
 *  - slug:        identificador para la dirección web. Solo minúsculas, números
 *                 y guiones. Ej: "polera-tu-frase" → stampachic.cl/producto/polera-tu-frase
 *                 ¡Debe ser único! No lo cambies después de compartir el link.
 *  - name:        nombre visible del producto.
 *  - price:       precio en pesos, SIN puntos. 18990 se muestra como $18.990
 *  - compareAt:   (opcional) precio "antes", para mostrar una oferta tachada.
 *  - categories:  categorías donde aparece (ver lista "categories" más abajo).
 *  - tags:        etiquetas: "nuevo", "mas-vendido", "pack".
 *  - short:       frase corta que aparece en la tarjeta del producto.
 *  - description: texto de venta completo (cada párrafo entre comillas, separado por comas).
 *  - details:     lista de detalles técnicos (material, técnica, cuidados).
 *  - sizes:       (opcional) tallas disponibles.
 *  - sizeGuide:   (opcional) "adulto" o "infantil" para mostrar la guía de tallas.
 *  - colors:      (opcional) colores: nombre visible + código de color (hex).
 *  - personalization: qué puede personalizar el cliente:
 *                 text = campo de texto, image = subir imagen/logo.
 *  - productionDays: plazo de producción que se muestra al cliente.
 *  - mockup:      dibujo que se usa mientras no haya fotos reales.
 *  - images:      FOTOS REALES. Súbelas a /public/productos/<slug>/ y escribe aquí
 *                 sus rutas, ej: ["/productos/pack-dia-del-tens/1.jpg"].
 *                 Si la lista está vacía [], se muestra el dibujo de muestra.
 *  - createdAt:   fecha de creación (AAAA-MM-DD), sirve para ordenar por "Novedades".
 * ============================================================
 */

export type CategorySlug =
  | "poleras"
  | "polerones"
  | "jockeys"
  | "tazones"
  | "botellas"
  | "tote-bags"
  | "estuches"
  | "packs"
  | "infantil";

export type Tag = "nuevo" | "mas-vendido" | "pack";

export type MockupKind =
  | "polera"
  | "poleron"
  | "jockey"
  | "tazon"
  | "botella"
  | "tote"
  | "cosmetiquero"
  | "estuche";

export type ProductColor = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  categories: CategorySlug[];
  tags: Tag[];
  short: string;
  description: string[];
  details: string[];
  sizes?: string[];
  sizeGuide?: "adulto" | "infantil";
  colors?: ProductColor[];
  personalization: { text: boolean; image: boolean; textLabel?: string };
  productionDays: string;
  mockup: MockupKind;
  /** Solo para packs: dibujos que se combinan en la imagen de muestra */
  packItems?: MockupKind[];
  images: string[];
  createdAt: string;
};

/** Categorías de la tienda (el orden aquí es el orden en pantalla) */
export const categories: { slug: CategorySlug; name: string; blurb: string; mockup: MockupKind; tint: string }[] = [
  { slug: "poleras", name: "Poleras", blurb: "Tu frase, tu foto, tu logo", mockup: "polera", tint: "#FCE3EE" },
  { slug: "polerones", name: "Polerones", blurb: "Abrigo con identidad", mockup: "poleron", tint: "#DDF1F7" },
  { slug: "packs", name: "Packs", blurb: "Regalos listos para sorprender", mockup: "tote", tint: "#FFF1C7" },
  { slug: "tazones", name: "Tazones", blurb: "Para el café de todos los días", mockup: "tazon", tint: "#E3F4EA" },
  { slug: "jockeys", name: "Jockeys", blurb: "Con tu logo o tu nombre", mockup: "jockey", tint: "#FDE6D8" },
  { slug: "botellas", name: "Botellas", blurb: "Hidratación con estilo", mockup: "botella", tint: "#DDF1F7" },
  { slug: "tote-bags", name: "Tote bags", blurb: "Lleva tu estilo a todas partes", mockup: "tote", tint: "#FCE3EE" },
  { slug: "estuches", name: "Estuches y cosmetiqueros", blurb: "Orden con personalidad", mockup: "cosmetiquero", tint: "#FFF1C7" },
  { slug: "infantil", name: "Infantil", blurb: "Con su nombre, a su manera", mockup: "polera", tint: "#E3F4EA" },
];

const ADULT_SIZES = ["S", "M", "L", "XL", "XXL"];
const KID_SIZES = ["2", "4", "6", "8", "10", "12", "14"];

const BASIC_COLORS: ProductColor[] = [
  { name: "Blanco", hex: "#FFFFFF" },
  { name: "Negro", hex: "#1D1B20" },
  { name: "Gris melange", hex: "#BDBDBD" },
  { name: "Rosado", hex: "#F7C6D9" },
];

export const products: Product[] = [
  {
    slug: "pack-dia-del-tens",
    name: "Pack Día del TENS",
    price: 18990, // AJUSTAR PRECIO
    categories: ["packs"],
    tags: ["pack", "mas-vendido"],
    short: "Tote bag + cosmetiquero + botella, listos para regalar.",
    description: [
      "El regalo que tu equipo de salud se merece: un pack pensado para el día a día en el turno, con diseño temático y el nombre de cada TENS.",
      "Ideal para jefaturas, compañeras y familias que quieren saludar en su día con algo útil, bonito y hecho a mano.",
    ],
    details: [
      "Incluye: tote bag de lona, cosmetiquero con cierre y botella de aluminio 600 ml",
      "Diseño temático TENS + nombre personalizado en las tres piezas",
      "Técnica: sublimación y vinilo textil de alta duración",
      "Tote bag lavable a mano en agua fría, sin cloro",
      "Pedidos por volumen para servicios y CESFAM: consulta descuentos",
    ],
    personalization: { text: true, image: false, textLabel: "Nombre para el pack" },
    productionDays: "3 a 5 días hábiles",
    mockup: "tote",
    packItems: ["tote", "cosmetiquero", "botella"],
    images: [],
    createdAt: "2026-09-01",
  },
  {
    slug: "pack-dia-del-profesor",
    name: "Pack Día del Profesor",
    price: 16990, // AJUSTAR PRECIO
    categories: ["packs"],
    tags: ["pack", "nuevo"],
    short: "Tazón + tote bag + estuche para agradecerle a su profe.",
    description: [
      "Un gracias que se usa todos los días. Tazón para el café de la sala de profesores, tote bag para cargar pruebas y un estuche para los plumones.",
      "Lo personalizamos con el nombre del profe y un mensaje del curso. Perfecto para regalos grupales.",
    ],
    details: [
      "Incluye: tazón cerámico 11 oz, tote bag de lona y estuche con cierre",
      "Nombre + mensaje del curso personalizados",
      "Tazón apto para microondas y lavavajillas (ciclo suave)",
      "¿Regalo de todo el curso? Pide el pack en cantidad con precio especial",
    ],
    personalization: { text: true, image: false, textLabel: "Nombre del profe y mensaje" },
    productionDays: "3 a 5 días hábiles",
    mockup: "tazon",
    packItems: ["tazon", "tote", "estuche"],
    images: [],
    createdAt: "2026-10-01",
  },
  {
    slug: "pack-navidad-en-familia",
    name: "Pack Navidad en Familia",
    price: 27990, // AJUSTAR PRECIO
    compareAt: 31960, // AJUSTAR PRECIO
    categories: ["packs", "tazones"],
    tags: ["pack", "nuevo"],
    short: "4 tazones navideños, cada uno con un nombre de la familia.",
    description: [
      "La foto del desayuno navideño ya tiene protagonistas. Cuatro tazones con diseño de temporada y el nombre de cada integrante de la familia.",
      "Llegan listos para poner bajo el árbol. Si son más de cuatro, agrega tazones extra en las notas del pedido.",
    ],
    details: [
      "Incluye: 4 tazones cerámicos 11 oz con diseño navideño",
      "Un nombre distinto en cada tazón",
      "Técnica: sublimación con colores que no se descascaran",
      "Apto para microondas y lavavajillas (ciclo suave)",
      "Pide antes del 15 de diciembre para asegurar entrega",
    ],
    personalization: { text: true, image: false, textLabel: "Los 4 nombres, separados por coma" },
    productionDays: "5 a 7 días hábiles",
    mockup: "tazon",
    packItems: ["tazon", "tazon", "tazon"],
    images: [],
    createdAt: "2026-10-15",
  },
  {
    slug: "pack-cumpleanero",
    name: "Pack Cumpleañero",
    price: 22990, // AJUSTAR PRECIO
    categories: ["packs", "infantil"],
    tags: ["pack"],
    short: "Polera + jockey + botella con su nombre y edad.",
    description: [
      "Para que el festejado se sienta la estrella del día: polera, jockey y botella con su nombre, su edad y el diseño que más le guste.",
      "Elige el tema (dinosaurios, unicornios, fútbol, espacio o el que imagine) y nosotras lo hacemos realidad.",
    ],
    details: [
      "Incluye: polera infantil de algodón, jockey infantil ajustable y botella de aluminio 500 ml",
      "Nombre + edad + tema personalizado",
      "Polera 100% algodón peinado, suave para piel sensible",
      "Lavar al revés, en agua fría, sin secadora",
    ],
    sizes: KID_SIZES,
    sizeGuide: "infantil",
    personalization: { text: true, image: true, textLabel: "Nombre, edad y tema" },
    productionDays: "4 a 6 días hábiles",
    mockup: "polera",
    packItems: ["polera", "jockey", "botella"],
    images: [],
    createdAt: "2026-08-10",
  },
  {
    slug: "polera-tu-frase",
    name: "Polera Tu Frase",
    price: 12990, // AJUSTAR PRECIO
    categories: ["poleras"],
    tags: ["mas-vendido"],
    short: "Algodón premium con la frase que te representa.",
    description: [
      "Esa frase que repites siempre, el chiste interno de tu grupo o el mantra que te sostiene: llévalo puesto.",
      "Corte clásico unisex, tela gruesa que no transparenta y estampado que aguanta lavado tras lavado.",
    ],
    details: [
      "100% algodón peinado 180 g/m²",
      "Corte recto unisex",
      "Técnica: DTF (Direct to Film), colores vivos y elásticos",
      "Lavar al revés en agua fría. No planchar sobre el estampado",
    ],
    sizes: ADULT_SIZES,
    sizeGuide: "adulto",
    colors: BASIC_COLORS,
    personalization: { text: true, image: true, textLabel: "Tu frase" },
    productionDays: "3 a 5 días hábiles",
    mockup: "polera",
    images: [],
    createdAt: "2026-05-02",
  },
  {
    slug: "polera-oversize-splash",
    name: "Polera Oversize Splash",
    price: 15990, // AJUSTAR PRECIO
    categories: ["poleras"],
    tags: ["nuevo"],
    short: "Corte holgado, diseño grande en la espalda.",
    description: [
      "El corte que todas quieren: hombro caído, largo extra y una caída que se ve bien con todo.",
      "Elige uno de nuestros diseños de salpicadura o envíanos el tuyo para la espalda completa.",
    ],
    details: [
      "100% algodón 220 g/m², tela gruesa y estructurada",
      "Corte oversize unisex (si te gusta más ajustada, pide una talla menos)",
      "Técnica: DTF en formato grande, hasta 30 × 40 cm",
      "Lavar al revés en agua fría",
    ],
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: "adulto",
    colors: [
      { name: "Negro", hex: "#1D1B20" },
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Arena", hex: "#E6D8C3" },
    ],
    personalization: { text: true, image: true, textLabel: "Texto para la espalda (opcional)" },
    productionDays: "3 a 5 días hábiles",
    mockup: "polera",
    images: [],
    createdAt: "2026-10-10",
  },
  {
    slug: "polera-infantil-con-nombre",
    name: "Polera Infantil con Nombre",
    price: 9990, // AJUSTAR PRECIO
    categories: ["poleras", "infantil"],
    tags: ["mas-vendido"],
    short: "Su nombre y su dibujo favorito, en algodón suave.",
    description: [
      "Nada les gusta más que ver su nombre en grande. Elegimos juntos el diseño y lo estampamos con tintas seguras para niños.",
      "Perfecta para el primer día de clases, paseos de curso o simplemente porque sí.",
    ],
    details: [
      "100% algodón peinado, suave y fresco",
      "Tintas base agua, libres de tóxicos",
      "Técnica: DTF, flexible y resistente al juego",
      "Lavar al revés, agua fría, sin secadora",
    ],
    sizes: KID_SIZES,
    sizeGuide: "infantil",
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Celeste", hex: "#BFE3F2" },
      { name: "Rosado", hex: "#F7C6D9" },
      { name: "Amarillo", hex: "#FFE38A" },
    ],
    personalization: { text: true, image: true, textLabel: "Nombre del niño o niña" },
    productionDays: "3 a 5 días hábiles",
    mockup: "polera",
    images: [],
    createdAt: "2026-04-12",
  },
  {
    slug: "poleron-canguro-personalizado",
    name: "Polerón Canguro Personalizado",
    price: 24990, // AJUSTAR PRECIO
    categories: ["polerones"],
    tags: ["mas-vendido"],
    short: "Con capucha, bolsillo canguro y tu diseño al frente.",
    description: [
      "El polerón que vas a querer usar todos los días de invierno, con tu diseño, tu logo o el de tu generación.",
      "Interior perchado calentito, puños elásticos y estampado que no se agrieta.",
    ],
    details: [
      "Mezcla 80% algodón / 20% poliéster, interior perchado",
      "Capucha con cordón y bolsillo canguro",
      "Técnica: DTF o vinilo textil, según el diseño",
      "Lavar al revés en agua fría. No usar secadora",
      "Ideal para generaciones de 4° medio: pide cotización por volumen",
    ],
    sizes: ADULT_SIZES,
    sizeGuide: "adulto",
    colors: [
      { name: "Negro", hex: "#1D1B20" },
      { name: "Gris melange", hex: "#BDBDBD" },
      { name: "Azul marino", hex: "#23305B" },
      { name: "Rosado", hex: "#F7C6D9" },
    ],
    personalization: { text: true, image: true, textLabel: "Texto o nombre" },
    productionDays: "4 a 6 días hábiles",
    mockup: "poleron",
    images: [],
    createdAt: "2026-03-20",
  },
  {
    slug: "poleron-iniciales",
    name: "Polerón Iniciales",
    price: 22990, // AJUSTAR PRECIO
    categories: ["polerones"],
    tags: ["nuevo"],
    short: "Cuello redondo, minimalista, con tus iniciales.",
    description: [
      "Discreto y elegante: tus iniciales en tipografía fina, a la altura del pecho. De esos regalos que se usan por años.",
      "Un clásico para parejas, mamás y para regalarte a ti misma.",
    ],
    details: [
      "Mezcla 80% algodón / 20% poliéster, interior perchado",
      "Cuello redondo con rib",
      "Técnica: vinilo textil premium (efecto mate o dorado)",
      "Lavar al revés en agua fría",
    ],
    sizes: ADULT_SIZES,
    sizeGuide: "adulto",
    colors: [
      { name: "Crudo", hex: "#EFE7DA" },
      { name: "Negro", hex: "#1D1B20" },
      { name: "Verde oliva", hex: "#6B7350" },
    ],
    personalization: { text: true, image: false, textLabel: "Tus iniciales (máx. 3 letras)" },
    productionDays: "4 a 6 días hábiles",
    mockup: "poleron",
    images: [],
    createdAt: "2026-09-25",
  },
  {
    slug: "jockey-trucker-con-logo",
    name: "Jockey Trucker con tu Logo",
    price: 9990, // AJUSTAR PRECIO
    categories: ["jockeys"],
    tags: [],
    short: "Frente estampado, malla trasera y broche ajustable.",
    description: [
      "El jockey que lleva tu marca, tu equipo o tu frase a todas partes. Fresco, liviano y ajustable para cualquier cabeza.",
    ],
    details: [
      "Frente de espuma, malla trasera transpirable",
      "Broche ajustable, talla única adulto",
      "Técnica: DTF sobre el frente",
      "Limpiar con paño húmedo, no lavar en máquina",
    ],
    colors: [
      { name: "Blanco / negro", hex: "#FFFFFF" },
      { name: "Negro", hex: "#1D1B20" },
      { name: "Azul marino", hex: "#23305B" },
    ],
    personalization: { text: true, image: true, textLabel: "Texto o nombre" },
    productionDays: "2 a 4 días hábiles",
    mockup: "jockey",
    images: [],
    createdAt: "2026-02-14",
  },
  {
    slug: "jockey-infantil",
    name: "Jockey Infantil",
    price: 7990, // AJUSTAR PRECIO
    categories: ["jockeys", "infantil"],
    tags: [],
    short: "Pequeño, liviano y con su nombre al frente.",
    description: [
      "Protección para el sol con estilo propio. Ideal para paseos, jardín y cumpleaños temáticos.",
    ],
    details: [
      "Talla infantil ajustable (aprox. 2 a 8 años)",
      "Técnica: DTF sobre el frente",
      "Limpiar con paño húmedo",
    ],
    colors: [
      { name: "Celeste", hex: "#BFE3F2" },
      { name: "Rosado", hex: "#F7C6D9" },
      { name: "Blanco", hex: "#FFFFFF" },
    ],
    personalization: { text: true, image: false, textLabel: "Nombre" },
    productionDays: "2 a 4 días hábiles",
    mockup: "jockey",
    images: [],
    createdAt: "2026-06-05",
  },
  {
    slug: "tazon-clasico-11oz",
    name: "Tazón Clásico 11 oz",
    price: 7990, // AJUSTAR PRECIO
    categories: ["tazones"],
    tags: ["mas-vendido"],
    short: "Tu foto o diseño en cerámica blanca de alta calidad.",
    description: [
      "El regalo que nunca falla: una foto que les saque una sonrisa cada mañana, una frase o el logo de tu emprendimiento.",
    ],
    details: [
      "Cerámica blanca 11 oz (325 ml)",
      "Técnica: sublimación, imagen permanente y brillante",
      "Apto para microondas y lavavajillas (ciclo suave)",
      "Viaja protegido en caja individual",
    ],
    personalization: { text: true, image: true, textLabel: "Texto (opcional)" },
    productionDays: "2 a 3 días hábiles",
    mockup: "tazon",
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Interior rosado", hex: "#F7C6D9" },
      { name: "Interior negro", hex: "#1D1B20" },
    ],
    images: [],
    createdAt: "2026-01-15",
  },
  {
    slug: "tazon-magico",
    name: "Tazón Mágico",
    price: 10990, // AJUSTAR PRECIO
    categories: ["tazones"],
    tags: ["nuevo"],
    short: "Negro por fuera; tu foto aparece con el café caliente.",
    description: [
      "La reacción es parte del regalo: el tazón es negro y, al servir algo caliente, aparece tu foto o mensaje.",
    ],
    details: [
      "Cerámica 11 oz con recubrimiento termosensible",
      "Técnica: sublimación especial",
      "Lavar a mano. No apto para microondas ni lavavajillas",
    ],
    personalization: { text: true, image: true, textLabel: "Mensaje secreto" },
    productionDays: "2 a 4 días hábiles",
    mockup: "tazon",
    colors: [{ name: "Negro", hex: "#1D1B20" }],
    images: [],
    createdAt: "2026-10-05",
  },
  {
    slug: "botella-acero-750",
    name: "Botella Térmica 750 ml",
    price: 12990, // AJUSTAR PRECIO
    categories: ["botellas"],
    tags: ["mas-vendido"],
    short: "Acero inoxidable doble pared, frío 24 h y calor 12 h.",
    description: [
      "Para el gym, la oficina o el turno largo. Mantiene el agua fría todo el día y lleva tu nombre para que nunca se pierda.",
    ],
    details: [
      "Acero inoxidable doble pared, libre de BPA",
      "Capacidad 750 ml, tapa hermética",
      "Técnica: grabado UV o vinilo, según color",
      "Lavar a mano. No apta para lavavajillas",
    ],
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Negro", hex: "#1D1B20" },
      { name: "Rosado", hex: "#F7C6D9" },
      { name: "Verde agua", hex: "#A7DCCB" },
    ],
    personalization: { text: true, image: true, textLabel: "Nombre o frase" },
    productionDays: "3 a 5 días hábiles",
    mockup: "botella",
    images: [],
    createdAt: "2026-03-01",
  },
  {
    slug: "botella-infantil-500",
    name: "Botella Infantil 500 ml",
    price: 8990, // AJUSTAR PRECIO
    categories: ["botellas", "infantil"],
    tags: [],
    short: "Aluminio liviano con su nombre, para la mochila.",
    description: [
      "Ya no se confunde en el colegio: su botella, su nombre y su personaje favorito.",
    ],
    details: [
      "Aluminio liviano, libre de BPA",
      "Capacidad 500 ml, tapa con mosquetón",
      "Técnica: sublimación",
      "Lavar a mano",
    ],
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Celeste", hex: "#BFE3F2" },
    ],
    personalization: { text: true, image: true, textLabel: "Nombre" },
    productionDays: "3 a 5 días hábiles",
    mockup: "botella",
    images: [],
    createdAt: "2026-07-01",
  },
  {
    slug: "tote-bag-lona",
    name: "Tote Bag de Lona",
    price: 7990, // AJUSTAR PRECIO
    categories: ["tote-bags"],
    tags: ["mas-vendido"],
    short: "Resistente, amplia y con tu diseño en un lado.",
    description: [
      "Para la feria, la playa o el día a día. Una bolsa que reemplaza a muchas y que dice algo de ti.",
    ],
    details: [
      "Lona de algodón 280 g/m², color crudo natural",
      "Medidas 38 × 42 cm, asas de 60 cm",
      "Técnica: DTF o serigrafía (pedidos por volumen)",
      "Lavar a mano en agua fría",
    ],
    colors: [
      { name: "Crudo", hex: "#EFE7DA" },
      { name: "Negro", hex: "#1D1B20" },
    ],
    personalization: { text: true, image: true, textLabel: "Texto o nombre" },
    productionDays: "2 a 4 días hábiles",
    mockup: "tote",
    images: [],
    createdAt: "2026-02-01",
  },
  {
    slug: "tote-bag-maxi",
    name: "Tote Bag Maxi con Cierre",
    price: 11990, // AJUSTAR PRECIO
    categories: ["tote-bags"],
    tags: ["nuevo"],
    short: "Más grande, con cierre y bolsillo interior.",
    description: [
      "Cabe el notebook, la colación y todo lo demás. Con cierre para que nada se salga y bolsillo para las llaves.",
    ],
    details: [
      "Lona gruesa 340 g/m²",
      "Medidas 45 × 38 × 12 cm, con fuelle",
      "Cierre superior y bolsillo interior",
      "Técnica: DTF",
    ],
    colors: [
      { name: "Crudo", hex: "#EFE7DA" },
      { name: "Negro", hex: "#1D1B20" },
      { name: "Rosado", hex: "#F7C6D9" },
    ],
    personalization: { text: true, image: true, textLabel: "Texto o nombre" },
    productionDays: "3 a 5 días hábiles",
    mockup: "tote",
    images: [],
    createdAt: "2026-09-12",
  },
  {
    slug: "cosmetiquero-con-nombre",
    name: "Cosmetiquero con Nombre",
    price: 6990, // AJUSTAR PRECIO
    categories: ["estuches"],
    tags: [],
    short: "Para el maquillaje, los remedios o lo que quieras ordenar.",
    description: [
      "Tamaño justo para la cartera o la maleta, con tu nombre o iniciales para darle un toque único.",
    ],
    details: [
      "Lona con forro interior impermeable",
      "Medidas 22 × 14 cm, cierre metálico",
      "Técnica: DTF o vinilo",
      "Limpiar con paño húmedo",
    ],
    colors: [
      { name: "Crudo", hex: "#EFE7DA" },
      { name: "Rosado", hex: "#F7C6D9" },
      { name: "Negro", hex: "#1D1B20" },
    ],
    personalization: { text: true, image: false, textLabel: "Nombre o iniciales" },
    productionDays: "2 a 4 días hábiles",
    mockup: "cosmetiquero",
    images: [],
    createdAt: "2026-04-01",
  },
  {
    slug: "estuche-escolar",
    name: "Estuche Escolar con Nombre",
    price: 5990, // AJUSTAR PRECIO
    categories: ["estuches", "infantil"],
    tags: [],
    short: "Que sus lápices vuelvan a casa: con su nombre en grande.",
    description: [
      "Un estuche resistente para todo el año escolar, con su nombre y un dibujo que le encante.",
    ],
    details: [
      "Lona resistente, cierre reforzado",
      "Medidas 21 × 9 cm",
      "Técnica: DTF",
      "Lavable a mano",
    ],
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Celeste", hex: "#BFE3F2" },
      { name: "Rosado", hex: "#F7C6D9" },
    ],
    personalization: { text: true, image: true, textLabel: "Nombre" },
    productionDays: "2 a 4 días hábiles",
    mockup: "estuche",
    images: [],
    createdAt: "2026-02-20",
  },
];

/* ---------- Funciones de ayuda (no es necesario editarlas) ---------- */

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getRelated(product: Product, limit = 4) {
  const same = products.filter(
    (p) => p.slug !== product.slug && p.categories.some((c) => product.categories.includes(c)),
  );
  const rest = products.filter((p) => p.slug !== product.slug && !same.includes(p));
  return [...same, ...rest].slice(0, limit);
}

export const bestSellers = products.filter((p) => p.tags.includes("mas-vendido"));

export const tagLabels: Record<Tag, string> = {
  nuevo: "Nuevo",
  "mas-vendido": "Más vendido",
  pack: "Pack",
};
