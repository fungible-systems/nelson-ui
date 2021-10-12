/* Utilities */
/* ========================================================================== */

/** Returns a string with the given prefix followed by the given values. */
export type Prefixed<K extends string, T> = `${K}${Extract<T, boolean | number | string>}`;

/** Narrowed number or string. */
export type Index = (number | string) & Record<never, never>;
