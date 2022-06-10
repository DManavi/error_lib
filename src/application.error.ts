import { BaseError } from './base.error';
import { ErrorOptions } from './types';

/**
 * Application Error
 */
export class ApplicationError extends BaseError {
  constructor(message?: string, error?: Error, opts?: ErrorOptions) {
    super(message || ApplicationError.name, error, {
      code: opts?.code || ApplicationError.name,
    });

    // set stacktrace
    Error.captureStackTrace(this, ApplicationError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
