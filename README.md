# StampaChic: tienda online

> **Tu estilo, Tu Marca.** Estampados y regalos personalizados hechos a mano en Machalí.

Esta guía está escrita para que puedas mantener tu tienda **sin saber programar**. Casi todo lo que vas a querer cambiar está en **4 archivos**:

| Quiero cambiar… | Archivo |
|---|---|
| WhatsApp, correo, Instagram, envío gratis, barra de anuncio | `config/site.ts` |
| Productos, precios, tallas, colores, fotos | `data/products.ts` |
| Testimonios | `data/testimonials.ts` |
| Fotos del Estampa Bar e Instagram, tabla de descuentos por volumen | `data/content.ts` |
| Colores de la marca | `app/globals.css` (arriba del todo) |

---

## 1. Cómo editar archivos (la forma más fácil)

Cuando el proyecto esté en **GitHub** (ver sección 6), puedes editar cualquier archivo desde el navegador:

1. Entra a tu repositorio en github.com y abre el archivo (por ejemplo `data/products.ts`).
2. Haz clic en el **lápiz ✏️** ("Edit this file").
3. Cambia lo que necesites.
4. Abajo, presiona **"Commit changes"**.
5. En 1 o 2 minutos, Vercel publica la nueva versión sola. ✨

**Reglas de oro al editar:**
- Cambia solo lo que está **entre comillas** `"..."` o los **números**.
- **No borres** comas `,`, llaves `{ }` ni corchetes `[ ]`.
- Si algo falla, Vercel **no publica** el cambio y tu sitio sigue funcionando con la versión anterior. Revisa qué coma o comilla se perdió.

---

## 2. Productos y precios (`data/products.ts`)

Cada producto es un bloque como este:

```ts
{
  slug: "pack-dia-del-tens",          // dirección web: stampachic.cl/producto/pack-dia-del-tens
  name: "Pack Día del TENS",          // nombre visible
  price: 18990, // AJUSTAR PRECIO     // precio SIN puntos (se muestra como $18.990)
  compareAt: 21990,                   // (opcional) precio "antes", aparece tachado
  categories: ["packs"],              // dónde aparece en la tienda
  tags: ["pack", "mas-vendido"],      // etiquetas: "nuevo", "mas-vendido", "pack"
  short: "Tote bag + cosmetiquero + botella…",
  description: ["Primer párrafo…", "Segundo párrafo…"],
  details: ["Material…", "Técnica…", "Cuidados…"],
  sizes: ["S", "M", "L"],             // (opcional) tallas
  sizeGuide: "adulto",                // (opcional) "adulto" o "infantil"
  colors: [{ name: "Negro", hex: "#1D1B20" }],  // (opcional) colores
  personalization: { text: true, image: true, textLabel: "Tu frase" },
  productionDays: "3 a 5 días hábiles",
  mockup: "tote",                     // dibujo de muestra si no hay fotos
  images: [],                         // 👉 aquí van tus fotos reales
  createdAt: "2026-09-01",            // fecha, para ordenar por "Novedades"
},
```

### Cambiar un precio
Busca el producto (Ctrl+F o Cmd+F con su nombre) y cambia el número de `price`. Todos los precios tienen el comentario `// AJUSTAR PRECIO` para que los revises uno por uno.

### Agregar un producto
1. Copia un bloque completo, desde `{` hasta `},`.
2. Pégalo justo antes del `];` final de la lista.
3. Cambia **todos** sus datos. El `slug` debe ser **único**, en minúsculas y con guiones (sin tildes ni ñ: `polera-nino`, no `polera-niño`).

### Quitar un producto
Borra su bloque completo, desde `{` hasta `},`.

### Categorías disponibles
`poleras`, `polerones`, `jockeys`, `tazones`, `botellas`, `tote-bags`, `estuches`, `packs`, `infantil`. Un producto puede estar en varias, por ejemplo `["jockeys", "infantil"]`.

### Guía de tallas
Las medidas están en `data/size-guide.ts`. Ajústalas con las de tu proveedor.

---

## 3. Fotos reales y logo

### Tu logo
El logo está en **`public/brand/logo.png`** (redondo, con fondo transparente). También hay una versión vectorial nítida en `public/brand/logo.svg`, útil para imprimir o para tus redes.
Para cambiarlo, sube un archivo nuevo con **el mismo nombre** (`logo.png`, cuadrado, mínimo 512×512 px) y reemplaza el anterior.
El ícono de la pestaña del navegador está en `app/icon.png` y el de iPhone en `app/apple-icon.png`: reemplázalos igual si cambias el logo.

### Fotos de productos
1. En `public/productos/` crea una carpeta con el **slug** del producto, por ejemplo `public/productos/pack-dia-del-tens/`.
2. Sube tus fotos ahí: `1.jpg`, `2.jpg`, `3.jpg`.
   - **Cuadradas** (1200×1200 px), con buena luz y fondo limpio.
   - Comprímelas en [squoosh.app](https://squoosh.app) para que pesen menos de 400 KB: el sitio carga más rápido.
3. En `data/products.ts`, en ese producto:
   ```ts
   images: ["/productos/pack-dia-del-tens/1.jpg", "/productos/pack-dia-del-tens/2.jpg"],
   ```
Mientras un producto no tenga fotos, se muestra un dibujo de muestra con los colores de la marca.

### Fotos del Estampa Bar e Instagram
Súbelas a `public/estampa-bar/` y `public/instagram/`, y escribe su ruta en `data/content.ts` (campo `src`).

---

## 4. WhatsApp, textos y colores

### Número de WhatsApp, correo y redes
En `config/site.ts`:
```ts
whatsapp: "56988999881",            // solo números, con 56 y sin "+"
whatsappDisplay: "+56 9 8899 9881", // cómo se ve en pantalla
email: "contacto@stampachic.cl",
```
Todos los botones de WhatsApp del sitio (botón flotante, checkout, cotizaciones) usan este número.

### Barra de anuncio superior
```ts
announcement: {
  enabled: true,   // false para ocultarla
  messages: ["Envíos a todo Chile 🚚", "Retiro gratis en Machalí"],
},
```

### Envío gratis
```ts
freeShippingThreshold: 40000,  // desde este monto el envío es gratis
courierBaseRate: 4990,         // valor referencial del envío
```

### Textos de las páginas
Los textos de cada página están en la carpeta `app/`:
- Inicio: `components/home/` (un archivo por sección)
- Nosotros: `app/nosotros/page.tsx`
- Preguntas frecuentes: `app/faq/page.tsx`
- Envíos, cambios y términos: `app/envios/`, `app/cambios-y-devoluciones/`, `app/terminos/`

Los textos de **políticas, términos, FAQ y la historia de Nosotros son textos base**: revísalos y ajústalos a tu realidad (están marcados con `REVISAR`). Para los términos y la política de cambios conviene una revisión legal.

### Modo revisión
En `config/site.ts`, `reviewMode: true` muestra en el sitio las notas amarillas "Texto base para revisar" y los **testimonios de ejemplo**. Con `reviewMode: false` (lo recomendado al publicar) quedan ocultos. Así nunca se publican reseñas inventadas.

### Testimonios
En `data/testimonials.ts` reemplaza los de ejemplo por testimonios reales (pide permiso a tus clientas) y cambia `example: true` a `example: false`. Mientras no haya testimonios reales, la home invita a etiquetarte en Instagram.

### Colores y tipografías
Arriba del todo de `app/globals.css`:
```css
--color-tinta: #17131c;    /* negro de textos */
--color-magenta: #d6136f;  /* botones principales */
--color-cian: #007c9c;
--color-amarillo: #ffc21a;
```
Cambia un código y se actualiza en todo el sitio. Las tipografías (Syne para títulos y DM Sans para textos) se cargan en `app/layout.tsx`.

---

## 4.1 Página "Muy pronto" y lanzamiento

Mientras preparas la tienda, **stampachic.cl** muestra una página con el logo y el mensaje "Estamos trabajando para entregarte pronto los mejores productos", con botones a WhatsApp e Instagram. La tienda completa sigue funcionando en **stampachic.vercel.app** para que la revises (Google no la indexa mientras tanto).

**El día del lanzamiento**, en `config/site.ts` cambia:
```ts
comingSoon: {
  enabled: false,   // antes decía true
```
Guarda, y en 1 o 2 minutos stampachic.cl muestra la tienda completa. 🎉

## 5. Cómo funcionan los pedidos

1. La clienta arma su carrito (talla, color, texto, imagen y notas).
2. En **Finalizar compra** completa sus datos (RUT validado, región y comuna).
3. Al confirmar se abre **WhatsApp** con el pedido completo, número de pedido y total.
4. Tú respondes con los datos de pago y le muestras el diseño antes de estampar.

Las imágenes que suben las clientas **no se guardan en ningún servidor**: se usan para la vista previa y el mensaje pide adjuntar el archivo original en el chat.

### Pago online (Mercado Pago o Webpay)
El sitio ya tiene un botón deshabilitado "Pagar online (próximamente)" y la estructura lista en `lib/payments/`. Para activarlo, un desarrollador debe:
1. Completar `lib/payments/mercadopago.ts` o `lib/payments/webpay.ts` (las instrucciones están dentro de cada archivo).
2. Guardar las claves secretas en Vercel → Settings → Environment Variables (nunca en el código).
3. Cambiar `onlinePayments.enabled` a `true` en `config/site.ts`.

---

## 6. Publicar en Vercel, paso a paso

### Primera vez
1. Crea una cuenta gratis en [github.com](https://github.com) y otra en [vercel.com](https://vercel.com) (entra con "Continue with GitHub").
2. Sube este proyecto a un repositorio nuevo de GitHub, por ejemplo `stampachic-web`.
   - Si te ayuda alguien técnico: `git remote add origin …` y `git push -u origin main`.
   - Sin terminal: en GitHub elige **"uploading an existing file"** y arrastra todas las carpetas **excepto** `node_modules` y `.next`.
3. En Vercel: **Add New… → Project**, elige el repositorio `stampachic-web` y presiona **Import**.
4. No cambies nada (Vercel detecta Next.js solo) y presiona **Deploy**.
5. En 1 a 2 minutos tendrás tu sitio en una dirección como `stampachic-web.vercel.app`. 🎉

Desde la terminal también se puede con un solo comando: `npx vercel --prod`.

Desde entonces, **cada cambio que guardes en GitHub se publica automáticamente**.

### Conectar tu dominio (ej. stampachic.cl)
1. Compra el dominio en [nic.cl](https://www.nic.cl) (los `.cl` se registran ahí).
2. En Vercel, abre tu proyecto → **Settings → Domains** → escribe `stampachic.cl` → **Add**. Agrega también `www.stampachic.cl`.
3. Vercel te mostrará los datos que hay que configurar. La forma más simple:
   - En NIC Chile → tu dominio → **Servidores de nombre (DNS)**, reemplaza los existentes por:
     `ns1.vercel-dns.com` y `ns2.vercel-dns.com`
   - Si usas correo con tu dominio (contacto@stampachic.cl), **antes** de cambiar los DNS pide ayuda para traspasar los registros MX del correo; o bien, en vez de cambiar los servidores, agrega en tu proveedor DNS los registros que indica Vercel (un registro **A** `76.76.21.21` para `stampachic.cl` y un **CNAME** `cname.vercel-dns.com` para `www`).
4. Espera entre 1 y 24 horas. Vercel activa el candado de seguridad (HTTPS) automáticamente.
5. No necesitas cambiar nada más: el sitio detecta solo su dirección principal en Vercel. Para que Google y los links compartidos usen `stampachic.cl`, en **Settings → Domains** déjalo marcado como dominio principal y vuelve a desplegar (**Deployments → ⋯ → Redeploy**).

### Después de publicar
- Registra tu sitio en [Google Search Console](https://search.google.com/search-console) y envía `https://stampachic.cl/sitemap.xml`.
- Crea tu ficha en **Google Business Profile** con la misma dirección y teléfono.
- Pon el link en la bio de Instagram (@_stampachic). Al compartirlo por WhatsApp o Instagram se ve con una imagen de marca generada automáticamente.

---

## 7. Para desarrolladores

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm run lint
```

- **Next.js 16** (App Router, Cache Components) + TypeScript + Tailwind CSS v4 + Zustand (carrito persistido en `localStorage`).
- Tokens de diseño en `app/globals.css` (`@theme`). Datos editables en `config/` y `data/`.
- SEO: metadatos por página, Open Graph y Twitter generados (`opengraph-image.tsx`), `sitemap.xml`, `robots.txt`, JSON-LD de `Store`, `Product` y `FAQPage`.
- Cierre de pedido por adaptadores (`lib/payments/`): `whatsapp` activo, `mercadopago` y `webpay` listos para implementar.
- Fuentes para las imágenes OG en `assets/`.
