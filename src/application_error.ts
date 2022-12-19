import { BaseError } from './base_error';
import { ErrorOptions } from './types';

const CLASS_NAME = 'ApplicationError';

/**
 * Application Error
 */
export class ApplicationError extends BaseError {
  /**
   * @constructor
   * @param {string | undefined} message Error message
   * @param {ErrorOptions | undefined} opts Error options
   * @returns {ApplicationError} New instance of the application error
   */
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
