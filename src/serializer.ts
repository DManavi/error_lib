/**
 * Normalize error object to remove non-serializable properties
 * @param error Error object
 * @returns Normalized error object
 */
export const normalizeErrorObject = (error: Error): Error =>
  JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));
