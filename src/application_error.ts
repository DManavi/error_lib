import { BaseError } from './base_error';
import { ErrorOptions } from './types';

const CLASS_NAME = 'ApplicationError';

/**
 * Application Error
 */
export class ApplicationError extends BaseError {
  constructor(message?: string, opts?: ErrorOptions) {
    super(message ?? CLASS_NAME, {
      ...opts,
      code: opts?.code ?? CLASS_NAME,
    });

    // set stacktrace
    Error.captureStackTrace(this, ApplicationError);
    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
