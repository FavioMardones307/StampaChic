"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Personalization = {
  text?: string;
  notes?: string;
  /** Nombre del archivo que subió el cliente (se envía después por WhatsApp) */
  imageName?: string;
  /** Miniatura liviana (dataURL) solo para mostrar la vista previa */
  imageThumb?: string;
};

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  colorHex?: string;
  personalization?: Personalization;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  /** Se incrementa en cada "agregar" para animar el contador */
  bump: number;
  add: (item: Omit<CartItem, "id">) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

function itemId(i: Omit<CartItem, "id">) {
  const p = i.personalization;
  return [i.slug, i.size, i.color, p?.text, p?.notes, p?.imageName].map((v) => v ?? "").join("|");
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      bump: 0,
      add: (item) =>
        set((s) => {
          const id = itemId(item);
          const existing = s.items.find((i) => i.id === id);
          const items = existing
            ? s.items.map((i) => (i.id === id ? { ...i, quantity: Math.min(99, i.quantity + item.quantity) } : i))
            : [...s.items, { ...item, id }];
          return { items, isOpen: true, bump: s.bump + 1 };
        }),
      setQuantity: (id, quantity) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(99, quantity)) } : i)),
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "stampachic-carrito",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.quantity, 0);
export const cartSubtotal = (items: CartItem[]) => items.reduce((n, i) => n + i.price * i.quantity, 0);
