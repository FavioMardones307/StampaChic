import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export const metadata: Metadata = { title: "Finalizar compra", robots: { index: false } };

export default function Checkout() {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display mb-2 text-[2.4rem] font-bold sm:text-5xl">Finalizar compra</h1>
      <p className="mb-8 text-tinta-suave">Completa tus datos y confirma tu pedido por WhatsApp en un paso.</p>
      <CheckoutForm />
    </Container>
  );
}
