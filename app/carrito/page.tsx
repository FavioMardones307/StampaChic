import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = { title: "Tu carrito", robots: { index: false } };

export default function Carrito() {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display mb-8 text-[2.4rem] font-bold sm:text-5xl">Tu carrito</h1>
      <CartPage />
    </Container>
  );
}
