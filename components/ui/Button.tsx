import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "light" | "whatsapp";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-tinta text-white hover:bg-magenta",
  dark: "bg-tinta text-white hover:bg-tinta-suave",
  outline: "border border-tinta/25 bg-white text-tinta hover:border-tinta",
  light: "bg-white text-tinta hover:bg-algodon",
  whatsapp: "bg-[#128C4B] text-white hover:bg-[#0e7a40]",
};
const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({ variant, size, className, children, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
