import { BaseError } from './base.error';
import { ErrorOptions } from './types';

/**
 * Application Error
 */
export class ApplicationError extends BaseError {
  constructor(message?: string, error?: Error, opts?: ErrorOptions) {
    // initialize null/undefined properties
    const _message = message || ApplicationError.name;

    super(_message, error, opts);

    // set stacktrace
    Error.captureStackTrace(this, ApplicationError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
