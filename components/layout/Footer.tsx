import Link from "next/link";
import { footerNav, site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { IconInstagram, IconMail, IconPin, IconWhatsApp } from "@/components/ui/Icons";
import { Splash } from "@/components/ui/Splash";
import { Logo } from "./Logo";

function Column({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-base font-bold text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/70 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-tinta text-white">
      <Splash seed={21} color="var(--color-magenta)" opacity={0.18} className="pointer-events-none absolute -right-24 -top-24 h-80 w-80" />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo inverse size={52} />
            <p className="font-display mt-6 text-3xl font-bold">{site.slogan}</p>
            <p className="mt-4 max-w-sm text-white/70">
              Estampamos a mano en {site.location.city} lo que te hace única: tu nombre, tu logo, tu historia.
            </p>
            <ul className="mt-6 space-y-3 text-white/80">
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <IconWhatsApp className="h-5 w-5" /> {site.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 hover:text-white">
                  <IconMail className="h-5 w-5" /> {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <IconInstagram className="h-5 w-5" /> {site.social.instagramHandle}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <IconPin className="h-5 w-5" /> {site.location.city}, {site.location.region}
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <Column title="Tienda" links={footerNav.tienda} />
            <Column title="Servicios" links={footerNav.servicios} />
            <Column title="Ayuda" links={footerNav.ayuda} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm text-white/60">Medios de pago</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {site.paymentMethods.map((m) => (
                <li key={m} className="rounded-md border border-white/20 px-2.5 py-1 text-xs font-semibold text-white/85">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-white/60">
            Hecho con amor en {site.location.city} 💛 {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
