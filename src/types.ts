/**
 * Error code type
 */
export type ErrorCodeType = string | number;

export type ErrorOptions = {
  /**
   * Error code
   */
  code?: ErrorCodeType;

  /**
   * Parent error
   */
  error?: Error;
};
