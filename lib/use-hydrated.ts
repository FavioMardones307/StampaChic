"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** true solo en el navegador (evita diferencias con el HTML del servidor). */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
