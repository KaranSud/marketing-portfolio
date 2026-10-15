import type Lenis from "lenis";

// Module-level singleton so nav links can drive the smooth-scroll instance.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
