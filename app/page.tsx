import { bestSellers } from "@/data/products";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Categories } from "@/components/home/Categories";
import { ProductCarousel } from "@/components/home/BestSellers";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PacksBanner } from "@/components/home/PacksBanner";
import { EstampaBarSection } from "@/components/home/EstampaBarSection";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { TrustBar } from "@/components/home/TrustBar";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <section className="pb-16 sm:pb-24" aria-labelledby="mas-vendidos">
        <Container>
          <SectionHeading
            title={<span id="mas-vendidos">Los que más se regalan</span>}
            intro="Los favoritos de nuestras clientas, listos para ponerles tu nombre."
            action={
              <ButtonLink href="/tienda" variant="outline" className="shrink-0 self-start sm:self-auto">
                Ver toda la tienda
              </ButtonLink>
            }
          />
          <div className="mt-10">
            <ProductCarousel products={bestSellers} label="Productos más vendidos" />
          </div>
        </Container>
      </section>
      <HowItWorks />
      <PacksBanner />
      <EstampaBarSection />
      <Testimonials />
      <InstagramFeed />
      <TrustBar />
    </>
  );
}
