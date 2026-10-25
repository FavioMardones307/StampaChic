import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { site } from "@/config/site";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { JsonLd, localBusinessLd } from "@/lib/seo";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["700"], variable: "--font-syne", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Estampados y regalos personalizados en Machalí`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "estampados personalizados Machalí",
    "poleras personalizadas Rancagua",
    "regalos personalizados Chile",
    "patch bar cumpleaños",
    "tazones personalizados",
    "packs Día del TENS",
    "poleras con logo empresas",
  ],
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: site.name,
    title: `${site.name} | ${site.slogan}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.slogan}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#17131c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#contenido" className="sr-only z-[60] rounded-full bg-tinta px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
          Saltar al contenido
        </a>
        <AnnouncementBar />
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <CartDrawer />
        <JsonLd data={localBusinessLd()} />
      </body>
    </html>
  );
}
