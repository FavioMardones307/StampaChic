/**
 * ============================================================
 *  CONFIGURACIÓN GENERAL DE STAMPACHIC
 * ============================================================
 *  Aquí están TODOS los datos que puedes cambiar sin saber programar:
 *  nombre, WhatsApp, correo, redes, envíos y textos de la barra superior.
 *
 *  Reglas simples:
 *  - Cambia solo lo que está entre comillas "..." o los números.
 *  - No borres las comas (,) del final de cada línea.
 *  - Guarda el archivo y el sitio se actualiza solo.
 * ============================================================
 */

export const site = {
  /** Nombre de la marca tal como aparece en el sitio */
  name: "StampaChic",

  /** Slogan (aparece en el footer y al compartir el link) */
  slogan: "Tu estilo, Tu Marca",

  /** Descripción corta para Google y redes (máx. ~160 caracteres) */
  description:
    "Poleras, polerones, tazones, tote bags y regalos personalizados hechos a mano en Machalí. Packs temáticos, Estampa Bar para eventos y envíos a todo Chile.",

  /**
   * Dirección web final del sitio (sin "/" al final).
   * Cámbiala cuando conectes tu dominio, por ejemplo "https://stampachic.cl".
   */
  url: "https://stampachic.cl",

  /**
   * Logo. Cuando subas tu logo real a /public/brand/logo.png,
   * cambia esta línea a: "/brand/logo.png"
   */
  logo: "/brand/logo.svg",

  /** Ubicación del taller */
  location: {
    city: "Machalí",
    region: "Región de O'Higgins",
    country: "Chile",
    /** Coordenadas aproximadas de Machalí (para Google) */
    lat: -34.1806,
    lng: -70.6489,
  },

  contact: {
    /**
     * WhatsApp SOLO con números, con código de país y sin "+" ni espacios.
     * Ejemplo: +56 9 8899 9881  →  "56988999881"
     */
    whatsapp: "56988999881",
    /** Cómo se muestra el número en pantalla */
    whatsappDisplay: "+56 9 8899 9881",
    email: "contacto@stampachic.cl",
    /** Horario de atención (texto libre) */
    hours: "Lunes a viernes de 10:00 a 19:00 · Sábados de 10:00 a 14:00",
  },

  social: {
    instagram: "https://instagram.com/_stampachic",
    instagramHandle: "@_stampachic",
  },

  /** Barra de anuncio superior. Puedes poner uno o varios mensajes. */
  announcement: {
    enabled: true,
    messages: ["Envíos a todo Chile 🚚", "Retiro gratis en Machalí"],
  },

  shipping: {
    /** Monto desde el cual el envío es gratis (en pesos, sin puntos) */
    freeShippingThreshold: 40000, // AJUSTAR
    /** Valor referencial del envío por courier (en pesos) */
    courierBaseRate: 4990, // AJUSTAR
    /** Texto que explica el envío */
    courierNote: "Envío por Starken o Chilexpress. El valor final se confirma según tu comuna.",
    /** Dirección / punto de retiro (se muestra en checkout) */
    pickupNote: "Retiro gratis en nuestro taller en Machalí, coordinado por WhatsApp.",
    /** Plazo de producción por defecto (días hábiles) */
    defaultProductionDays: "3 a 5 días hábiles",
  },

  /** Medios de pago que aceptas (se muestran en el footer y checkout) */
  paymentMethods: ["Transferencia", "Débito", "Crédito", "Mercado Pago"],

  /**
   * Modo revisión. Ponlo en true para ver en el sitio las notas
   * "Texto base para revisar" y los testimonios de EJEMPLO.
   * Déjalo en false al publicar: así nunca se muestran reseñas inventadas.
   */
  reviewMode: false,

  /**
   * Pago online. Cuando integres Mercado Pago o Webpay, cambia "enabled" a true.
   * (Requiere ayuda técnica: ver README, sección "Pago online").
   */
  onlinePayments: {
    enabled: false,
    provider: "mercadopago" as "mercadopago" | "webpay",
  },
} as const;

/** Menú principal del sitio */
export const mainNav = [
  { label: "Tienda", href: "/tienda" },
  { label: "Personaliza", href: "/personaliza" },
  { label: "Estampa Bar", href: "/estampa-bar" },
  { label: "Empresas y Colegios", href: "/empresas" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

/** Links del pie de página */
export const footerNav = {
  tienda: [
    { label: "Toda la tienda", href: "/tienda" },
    { label: "Packs temáticos", href: "/tienda?categoria=packs" },
    { label: "Infantil", href: "/tienda?categoria=infantil" },
    { label: "Personaliza el tuyo", href: "/personaliza" },
  ],
  servicios: [
    { label: "Estampa Bar para eventos", href: "/estampa-bar" },
    { label: "Empresas y Colegios", href: "/empresas" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  ayuda: [
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Envíos", href: "/envios" },
    { label: "Cambios y devoluciones", href: "/cambios-y-devoluciones" },
    { label: "Términos y condiciones", href: "/terminos" },
  ],
} as const;
