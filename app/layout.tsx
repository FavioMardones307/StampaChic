import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { site } from "@/config/site";
import { JsonLd, localBusinessLd } from "@/lib/seo";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display-face", display: "swap" });
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
    <html lang="es-CL" className={`${display.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {children}
        <JsonLd data={localBusinessLd()} />
      </body>
    </html>
  );
}
