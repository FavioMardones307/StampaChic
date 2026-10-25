import { site } from "@/config/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${site.name}: ${site.slogan}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: site.slogan, subtitle: "Estampados y regalos personalizados, hechos a mano en Chile." });
}
