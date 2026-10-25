import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Section";
import { Confirmation } from "@/components/cart/Confirmation";

export const metadata: Metadata = { title: "Pedido recibido", robots: { index: false } };

export default function ConfirmacionPage() {
  return (
    <Container className="py-14 sm:py-20">
      <Suspense fallback={<div className="h-96" aria-busy="true" />}>
        <Confirmation />
      </Suspense>
    </Container>
  );
}
