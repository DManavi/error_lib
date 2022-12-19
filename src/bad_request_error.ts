import { ApplicationError } from './application_error';
import { ErrorOptions } from './types';
import { safeGetProperty } from './utils';

const CLASS_NAME = 'BadRequest';

export type BadRequestErrorOptions<TClientErrors = void> = ErrorOptions &
  (TClientErrors extends void
    ? {}
    : {
        /**
         * Client errors
         */
        clientErrors: TClientErrors;
      });

/**
 * BadRequestError
 */
export class BadRequestError<TClientErrors = void> extends ApplicationError {
  /**
   * Client error(s)
   */
  public readonly clientErrors?: TClientErrors;

  /**
   * @constructor
   * @param {string | undefined} message Error message
   * @param {BadRequestErrorOptions | undefined} opts Error options
   */
  constructor(message?: string, opts?: BadRequestErrorOptions<TClientErrors>) {
    super(message ?? CLASS_NAME, {
      error: opts?.error,
      code: opts?.code ?? CLASS_NAME,
    });

    /* Class-specific parameters */
    this.clientErrors = safeGetProperty<any>(opts, 'clientErrors');

    // set stacktrace
    Error.captureStackTrace(this, BadRequestError);
    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
