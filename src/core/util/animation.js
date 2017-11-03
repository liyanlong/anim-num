
// Robert Penner's easeOutExpo
export function easeOutExpo(t, b, c, d) {
  return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
}

export const ANIMATION_FNS = {
  easeOutExpo
}
