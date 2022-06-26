import { BaseError } from './base.error';
import { ErrorOptions } from './types';

const CLASS_NAME = 'ApplicationError';

/**
 * Application Error
 */
export class ApplicationError extends BaseError {
  constructor(message?: string, error?: Error, opts?: ErrorOptions) {
    super(message || CLASS_NAME, error, {
      code: opts?.code || CLASS_NAME,
    });

    // set stacktrace
    Error.captureStackTrace(this, ApplicationError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
