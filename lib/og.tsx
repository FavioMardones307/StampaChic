import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { splashDrops, splashPath } from "@/components/ui/Splash";

export const ogSize = { width: 1200, height: 630 };

/** Imagen para compartir en WhatsApp / Instagram / redes. */
export async function renderOg({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) {
  const [syne, dm] = await Promise.all([
    readFile(join(process.cwd(), "assets/Syne-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/DMSans-Medium.ttf")),
  ]);
  const blobs = [
    { seed: 3, color: "#d6136f", x: 760, y: 40, s: 2.6 },
    { seed: 8, color: "#2bb3d6", x: 900, y: 250, s: 1.8 },
    { seed: 5, color: "#ffc21a", x: 700, y: 330, s: 1.3 },
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#17131c", position: "relative", fontFamily: "DM Sans" }}>
        {blobs.map((b) => (
          <svg key={b.seed} width={200 * b.s} height={200 * b.s} viewBox="0 0 200 200" style={{ position: "absolute", left: b.x, top: b.y }}>
            <path d={splashPath(b.seed)} fill={b.color} />
            {splashDrops(b.seed).map((c, i) => (
              <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={b.color} />
            ))}
          </svg>
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontFamily: "Syne", fontSize: 40, color: "white", display: "flex" }}>
              Stampa<span style={{ color: "#ff4f9e" }}>Chic</span>
            </div>
            {badge && (
              <div style={{ background: "#ffc21a", color: "#17131c", fontSize: 26, padding: "6px 18px", borderRadius: 999, marginLeft: 12 }}>{badge}</div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
            <div
              style={{
                fontFamily: "Syne",
                fontSize: title.length > 26 ? 76 : 96,
                lineHeight: 1,
                color: "white",
                letterSpacing: -2,
                textShadow: "5px 4px 0 #d6136f, -4px -3px 0 #2bb3d6",
              }}
            >
              {title}
            </div>
            <div style={{ marginTop: 28, fontSize: 32, color: "rgba(255,255,255,0.85)" }}>{subtitle}</div>
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
            {`${site.location.city}, Chile · Envíos a todo Chile · ${site.social.instagramHandle}`}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Syne", data: syne, weight: 800, style: "normal" },
        { name: "DM Sans", data: dm, weight: 500, style: "normal" },
      ],
    },
  );
}
