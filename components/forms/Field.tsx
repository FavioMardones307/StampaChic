import type { ReactNode } from "react";

export const inputClass =
  "mt-1.5 w-full rounded-xl border bg-white px-4 text-[1rem] focus:border-tinta focus:outline-none aria-[invalid=true]:border-magenta";

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {optional && <span className="font-normal text-tinta-suave">(opcional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-tinta-suave">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-magenta">
          {error}
        </p>
      )}
    </div>
  );
}

/** Props de accesibilidad para inputs con error */
export function a11y(id: string, error?: string, hint?: string) {
  return {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}
