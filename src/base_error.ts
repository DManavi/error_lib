import { ErrorCodeType, ErrorOptions } from './types';

const CLASS_NAME = 'BaseError';

/**
 * BaseError
 */
export abstract class BaseError extends Error {
  /**
   * Error code
   */
  public readonly code: ErrorCodeType;

  /**
   * @constructor
   * @param {string | undefined} message Error message
   * @param {ErrorOptions | undefined} opts Error Options
   */
  constructor(message?: string, opts?: ErrorOptions) {
    super(message ?? CLASS_NAME);

    this.message = message ?? CLASS_NAME;
    this.stack = opts?.error?.stack;
    this.code = opts?.code ?? CLASS_NAME;

    // set stacktrace
    Error.captureStackTrace(this, BaseError);
    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
