/**
 * Salpicaduras de pintura en SVG, generadas de forma determinística
 * (la misma "semilla" siempre dibuja la misma mancha).
 */

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function splashPath(seed: number, cx = 100, cy = 100, r = 60, spikes = 13) {
  const rand = rng(seed);
  const pts: [number, number][] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const a = (i / (spikes * 2)) * Math.PI * 2;
    const isSpike = i % 2 === 0;
    const rr = isSpike ? r * (0.95 + rand() * 0.55) : r * (0.62 + rand() * 0.18);
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  // Curva suave que pasa por los puntos medios
  let d = "";
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const n = pts[(i + 1) % pts.length];
    const mx = (p[0] + n[0]) / 2;
    const my = (p[1] + n[1]) / 2;
    d += i === 0 ? `M${mx.toFixed(1)} ${my.toFixed(1)}` : ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const p0 = pts[0];
  const n0 = pts[1];
  d += ` Q${p0[0].toFixed(1)} ${p0[1].toFixed(1)} ${((p0[0] + n0[0]) / 2).toFixed(1)} ${((p0[1] + n0[1]) / 2).toFixed(1)}Z`;
  return d;
}

export function splashDrops(seed: number, cx = 100, cy = 100, r = 60, count = 6) {
  const rand = rng(seed * 7 + 3);
  return Array.from({ length: count }, () => {
    const a = rand() * Math.PI * 2;
    const dist = r * (1.35 + rand() * 0.5);
    return { cx: cx + Math.cos(a) * dist, cy: cy + Math.sin(a) * dist, r: 2 + rand() * 6 };
  });
}

type SplashProps = {
  seed?: number;
  color?: string;
  className?: string;
  opacity?: number;
};

/** Mancha decorativa. Siempre es aria-hidden (no aporta contenido). */
export function Splash({ seed = 1, color = "var(--color-magenta)", className, opacity = 1 }: SplashProps) {
  const d = splashPath(seed);
  const drops = splashDrops(seed);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <g fill={color} opacity={opacity}>
        <path d={d} />
        {drops.map((c, i) => (
          <circle key={i} cx={c.cx.toFixed(1)} cy={c.cy.toFixed(1)} r={c.r.toFixed(1)} />
        ))}
      </g>
    </svg>
  );
}
