/**
 * Guía de tallas (medidas en centímetros, prenda estirada sobre una mesa).
 * AJUSTAR con las medidas reales de tus proveedores.
 */
export const sizeGuides = {
  adulto: {
    title: "Guía de tallas adulto",
    columns: ["Talla", "Ancho (axila a axila)", "Largo"],
    rows: [
      ["S", "48", "70"],
      ["M", "51", "72"],
      ["L", "54", "74"],
      ["XL", "57", "76"],
      ["XXL", "60", "78"],
    ],
    tip: "Mide una polera que te quede bien y compárala con la tabla. Si estás entre dos tallas, elige la mayor.",
  },
  infantil: {
    title: "Guía de tallas infantil",
    columns: ["Talla", "Edad aprox.", "Ancho", "Largo"],
    rows: [
      ["2", "1 a 2 años", "30", "38"],
      ["4", "3 a 4 años", "32", "42"],
      ["6", "5 a 6 años", "35", "46"],
      ["8", "7 a 8 años", "38", "50"],
      ["10", "9 a 10 años", "41", "54"],
      ["12", "11 a 12 años", "44", "58"],
      ["14", "13 a 14 años", "46", "62"],
    ],
    tip: "Los niños crecen rápido: si dudas, elige una talla más.",
  },
} as const;
