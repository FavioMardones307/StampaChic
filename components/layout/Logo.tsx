import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";

export function Logo({ inverse = false, size = 44 }: { inverse?: boolean; size?: number }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${site.name}, ir al inicio`}>
      <Image
        src={site.logo}
        alt=""
        width={size}
        height={size}
        unoptimized={site.logo.endsWith(".svg")}
        className="rounded-full"
        priority
      />
      <span className={`font-display text-[1.15rem] sm:text-[1.35rem] font-bold tracking-tight ${inverse ? "text-white" : "text-tinta"}`}>
        Stampa<span className={inverse ? "text-[#ff5aa5]" : "text-magenta"}>Chic</span>
      </span>
    </Link>
  );
}
