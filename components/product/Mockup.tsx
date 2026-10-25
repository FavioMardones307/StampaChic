import type { MockupKind } from "@/data/products";
import { splashPath } from "@/components/ui/Splash";

/**
 * Dibujo de muestra de cada producto (se usa mientras no haya fotos reales).
 * También funciona como vista previa en vivo: muestra el texto y la imagen
 * que el cliente agrega en la ficha de producto.
 */

const OUTLINE = "rgb(23 19 28 / 0.16)";

function isDark(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
}

/** Zona de estampado: centro, ancho y rotación por tipo de producto */
const PRINT: Record<MockupKind, { x: number; y: number; w: number; rot?: number }> = {
  polera: { x: 200, y: 205, w: 105 },
  poleron: { x: 200, y: 185, w: 95 },
  jockey: { x: 200, y: 182, w: 70 },
  tazon: { x: 192, y: 215, w: 90 },
  botella: { x: 200, y: 240, w: 58 },
  tote: { x: 200, y: 258, w: 110 },
  cosmetiquero: { x: 200, y: 240, w: 100 },
  estuche: { x: 200, y: 216, w: 90 },
};

function Body({ kind, fill }: { kind: MockupKind; fill: string }) {
  const common = { fill, stroke: OUTLINE, strokeWidth: 2, strokeLinejoin: "round" as const };
  switch (kind) {
    case "polera":
      return (
        <g>
          <path {...common} d="M132 72 L168 56 Q200 82 232 56 L268 72 L332 118 L302 170 L274 154 L274 334 Q200 346 126 334 L126 154 L98 170 L68 118 Z" />
          <path d="M168 56 Q200 82 232 56" fill="none" stroke={OUTLINE} strokeWidth="6" />
        </g>
      );
    case "poleron":
      return (
        <g>
          <path {...common} d="M140 82 Q200 58 260 82 L298 100 Q326 170 332 292 L296 298 L280 182 L280 332 Q200 344 120 332 L120 182 L104 298 L68 292 Q74 170 102 100 Z" />
          <path {...common} d="M156 84 Q200 22 244 84 Q200 112 156 84 Z" />
          <path {...common} d="M150 258 L250 258 L262 306 L138 306 Z" />
          <path d="M190 104 L188 140 M210 104 L212 140" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "jockey":
      return (
        <g>
          <path {...common} d="M104 232 Q100 118 200 112 Q300 118 296 232 Z" />
          <path {...common} d="M96 228 Q210 212 348 242 Q354 266 322 266 Q210 250 96 252 Z" />
          <path d="M200 113 L200 230" stroke={OUTLINE} strokeWidth="2" />
          <circle cx="200" cy="113" r="7" fill={fill} stroke={OUTLINE} strokeWidth="2" />
        </g>
      );
    case "tazon":
      return (
        <g>
          <path d="M262 168 Q326 166 326 214 Q326 262 262 262" fill="none" stroke={fill} strokeWidth="22" />
          <path d="M262 168 Q326 166 326 214 Q326 262 262 262" fill="none" stroke={OUTLINE} strokeWidth="24" strokeOpacity="0.5" style={{ mixBlendMode: "multiply" }} />
          <path {...common} d="M112 128 L272 128 L268 300 Q192 318 116 300 Z" />
          <ellipse cx="192" cy="128" rx="80" ry="14" fill={fill} stroke={OUTLINE} strokeWidth="2" />
          <ellipse cx="192" cy="129" rx="70" ry="9" fill="rgb(23 19 28 / 0.12)" />
        </g>
      );
    case "botella":
      return (
        <g>
          <rect {...common} x="174" y="64" width="52" height="46" rx="10" />
          <rect x="186" y="54" width="28" height="14" rx="5" fill={fill} stroke={OUTLINE} strokeWidth="2" />
          <path {...common} d="M178 110 L222 110 Q252 122 252 160 L252 330 Q252 352 228 352 L172 352 Q148 352 148 330 L148 160 Q148 122 178 110 Z" />
        </g>
      );
    case "tote":
      return (
        <g>
          <path d="M150 158 Q150 84 200 84 Q250 84 250 158" fill="none" stroke={fill} strokeWidth="14" />
          <path d="M150 158 Q150 84 200 84 Q250 84 250 158" fill="none" stroke={OUTLINE} strokeWidth="16" strokeOpacity="0.45" style={{ mixBlendMode: "multiply" }} />
          <path {...common} d="M108 152 L292 152 L300 352 L100 352 Z" />
        </g>
      );
    case "cosmetiquero":
      return (
        <g>
          <path {...common} d="M90 176 Q200 156 310 176 L322 304 Q200 322 78 304 Z" />
          <path d="M96 190 Q200 172 304 190" fill="none" stroke={OUTLINE} strokeWidth="4" strokeDasharray="4 4" />
          <path d="M292 186 L306 220 L296 224 Z" fill="var(--color-oro)" />
        </g>
      );
    case "estuche":
      return (
        <g>
          <rect {...common} x="66" y="168" width="268" height="96" rx="44" />
          <path d="M100 186 L300 186" stroke={OUTLINE} strokeWidth="4" strokeDasharray="4 4" />
          <path d="M300 182 L318 202 L308 206 Z" fill="var(--color-oro)" />
        </g>
      );
  }
}

export type MockupProps = {
  kind: MockupKind;
  color?: string;
  /** Color de fondo del recuadro */
  background?: string;
  /** Texto en la zona de estampado */
  text?: string;
  /** Imagen subida por el cliente (dataURL) */
  image?: string;
  seed?: number;
  title?: string;
  /** Mostrar solo el producto (sin fondo), para componer packs */
  bare?: boolean;
  className?: string;
};

const ACCENTS = ["#d6136f", "#2bb3d6", "#ffc21a", "#1f9d5b", "#f2651c"];

export function Mockup({
  kind,
  color = "#FFFFFF",
  background = "#F2EFF3",
  text,
  image,
  seed = 3,
  title,
  bare,
  className,
}: MockupProps) {
  const p = PRINT[kind];
  const dark = isDark(color);
  const accent = ACCENTS[seed % ACCENTS.length];
  const accent2 = ACCENTS[(seed + 2) % ACCENTS.length];
  const s = p.w / 120; // escala del estampado
  const label = (text ?? "").slice(0, 22);
  const fontSize = Math.max(9, Math.min(22, (p.w * 1.6) / Math.max(label.length, 5)));
  const clipId = `print-${kind}-${seed}`;

  const content = (
    <>
      <Body kind={kind} fill={color} />
      <g transform={`translate(${p.x} ${p.y})`}>
        {image ? (
          <>
            <clipPath id={clipId}>
              <rect x={-p.w / 2} y={-p.w / 2} width={p.w} height={p.w} rx="6" />
            </clipPath>
            <image href={image} x={-p.w / 2} y={-p.w / 2} width={p.w} height={p.w} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />
          </>
        ) : (
          <g transform={`scale(${s}) translate(-100 -100)`} opacity={label ? 0.9 : 1}>
            <path d={splashPath(seed, 100, 100, 46)} fill={accent} />
            <path d={splashPath(seed + 5, 122, 86, 22, 9)} fill={accent2} style={{ mixBlendMode: dark ? "screen" : "multiply" }} />
          </g>
        )}
        {label && (
          <text
            y={image ? p.w / 2 + fontSize + 2 : fontSize * 0.35}
            textAnchor="middle"
            style={{ fontFamily: "var(--font-display)" }}
            fontWeight="800"
            fontSize={fontSize}
            fill={image ? (dark ? "#fff" : "#17131c") : "#fff"}
            stroke={image ? "none" : "#17131c"}
            strokeWidth={image ? 0 : fontSize / 7}
            paintOrder="stroke"
          >
            {label}
          </text>
        )}
      </g>
    </>
  );

  if (bare) return <g>{content}</g>;

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title ?? `Ilustración de ${kind}`}>
      <rect width="400" height="400" fill={background} />
      <ellipse cx="200" cy="362" rx="130" ry="10" fill="#17131c" opacity="0.07" />
      {content}
    </svg>
  );
}

/** Imagen de muestra para packs: combina varios productos. */
export function PackMockup({
  items,
  background = "#FFF1C7",
  text,
  seed = 2,
  title,
  className,
}: {
  items: MockupKind[];
  background?: string;
  text?: string;
  seed?: number;
  title?: string;
  className?: string;
}) {
  const layout = [
    { x: -40, y: 40, size: 260 },
    { x: 140, y: 70, size: 250 },
    { x: 60, y: 120, size: 290 },
  ];
  const colors = ["#FFFFFF", "#F7C6D9", "#EFE7DA"];
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title ?? "Ilustración del pack"}>
      <rect width="400" height="400" fill={background} />
      <ellipse cx="200" cy="370" rx="160" ry="10" fill="#17131c" opacity="0.08" />
      {items.slice(0, 3).map((k, i) => {
        const l = layout[i];
        return (
          <svg key={i} x={l.x} y={l.y} width={l.size} height={l.size} viewBox="0 0 400 400" overflow="visible">
            <Mockup kind={k} bare color={colors[i % colors.length]} seed={seed + i} text={i === 2 ? text : undefined} />
          </svg>
        );
      })}
    </svg>
  );
}
