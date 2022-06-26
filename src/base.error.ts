import { ErrorCodeType, ErrorOptions } from './types';

const CLASS_NAME = 'BaseError';

export abstract class BaseError extends Error {
  /**
   * Error code
   */
  public readonly code: ErrorCodeType;

  constructor(message?: string, error?: Error, opts?: ErrorOptions) {
    super(message || CLASS_NAME);

    this.message = message || CLASS_NAME;
    this.stack = error?.stack;
    this.code = opts?.code || CLASS_NAME;

    // set stacktrace
    Error.captureStackTrace(this, BaseError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
