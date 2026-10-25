import { IconPlus } from "./Icons";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-linea border-y border-linea">
      {items.map((i) => (
        <details key={i.q} className="group py-1">
          <summary className="flex items-center justify-between gap-4 py-4 text-lg font-semibold">
            {i.q}
            <IconPlus className="faq-icon h-5 w-5 shrink-0 transition-transform" />
          </summary>
          <p className="max-w-3xl pb-5 leading-relaxed text-tinta-suave">{i.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}
