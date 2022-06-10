import { ErrorCodeType, ErrorOptions } from './types';

export abstract class BaseError extends Error {
  /**
   * Error code
   */
  public readonly code: ErrorCodeType;

  constructor(message?: string, error?: Error, opts?: ErrorOptions) {
    super(message || BaseError.name);

    this.message = message || BaseError.name;
    this.stack = error?.stack;
    this.code = opts?.code || BaseError.name;

    // set stacktrace
    Error.captureStackTrace(this, BaseError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
