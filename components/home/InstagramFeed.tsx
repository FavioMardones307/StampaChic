import { site } from "@/config/site";
import { instagramPosts } from "@/data/content";
import { buttonClass } from "@/components/ui/Button";
import { IconInstagram } from "@/components/ui/Icons";
import { PhotoTile } from "@/components/ui/PhotoTile";
import { Container } from "@/components/ui/Section";

export function InstagramFeed() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="instagram">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="instagram" className="font-display text-[2rem] font-bold sm:text-5xl">
              Míranos estampar en {site.social.instagramHandle}
            </h2>
            <p className="mt-3 text-lg text-tinta-suave">Procesos, pedidos recién salidos del taller y lanzamientos antes que nadie.</p>
          </div>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={buttonClass("outline", "md", "shrink-0")}>
            <IconInstagram className="h-5 w-5" /> Síguenos
          </a>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-1.5 sm:gap-3 lg:grid-cols-6">
          {instagramPosts.map((p, i) => (
            <li key={i}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg sm:rounded-xl"
                aria-label={`${p.alt} (abre Instagram)`}
              >
                <PhotoTile {...p} seed={i + 3} sizes="(min-width:1024px) 16vw, 33vw" />
                <span className="absolute inset-0 flex items-center justify-center bg-tinta/0 text-white opacity-0 transition group-hover:bg-tinta/40 group-hover:opacity-100">
                  <IconInstagram className="h-7 w-7" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
