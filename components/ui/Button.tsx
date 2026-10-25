import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "light" | "whatsapp";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-magenta text-white hover:bg-magenta-oscuro shadow-[0_6px_0_-2px_var(--color-tinta)] hover:shadow-[0_3px_0_-1px_var(--color-tinta)] hover:translate-y-[2px]",
  dark: "bg-tinta text-white hover:bg-black",
  outline: "border-2 border-tinta text-tinta hover:bg-tinta hover:text-white",
  light: "bg-white text-tinta hover:bg-algodon",
  whatsapp: "bg-[#128C4B] text-white hover:bg-[#0e7a40]",
};
const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;
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
