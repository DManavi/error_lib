import { ErrorCodeType, ErrorOptions } from './types';

export abstract class BaseError extends Error {
  /**
   * Error code
   */
  public readonly code: ErrorCodeType;

  constructor(message?: string, error?: Error, opts?: ErrorOptions) {
    // initialize null/undefined properties
    const _message = message || BaseError.name;

    /* Initialization phase */
    super(_message);

    this.message = _message;
    this.stack = error?.stack;
    this.code = opts?.code || BaseError.name;

    // set stacktrace
    Error.captureStackTrace(this, BaseError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
