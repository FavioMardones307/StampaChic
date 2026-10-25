const ITEMS = ["Poleras", "Polerones", "Tazones", "Tote bags", "Jockeys", "Botellas", "Packs de regalo", "Estampa Bar", "Uniformes con logo"];

/** Franja con texto en movimiento (se detiene si la persona prefiere menos movimiento). */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((t) => (
        <li key={t} className="flex items-center">
          <span className="font-display px-6 text-2xl font-semibold sm:text-3xl">{t}</span>
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-magenta" aria-hidden>
            <path d="M10 0c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10C6 9 9 6 10 0Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-tinta py-5 text-white" aria-label="Lo que estampamos">
      <div className="flex w-max animate-marquesina motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
