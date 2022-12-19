/**
 * Safely get a property from an object
 * @param obj Target object
 * @param prop Property name
 * @returns Property value
 */
export const safeGetProperty = <T = any, U = any>(obj: T, prop: keyof T): U =>
  ((obj ?? {}) as any)[prop] as U;
