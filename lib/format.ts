const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

/** 18990 → "$18.990" */
export function formatCLP(value: number) {
  // Intl puede devolver "$18.990" o "$ 18.990" según el entorno: lo normalizamos.
  return clp.format(Math.round(value)).replace(/\s/g, "");
}
