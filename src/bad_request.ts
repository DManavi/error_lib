import { ApplicationError } from './application_error';
import { ErrorOptions } from './types';

const CLASS_NAME = 'BadRequest';

export type BadRequestErrorOptions<TError = any> = ErrorOptions & {
  /**
   * Client errors
   */
  clientErrors: Array<TError>;
};

export class BadRequestError<TError = any> extends ApplicationError {
  /**
   * Client error(s)
   */
  public readonly clientErrors: Array<TError>;

  constructor(message?: string, opts?: BadRequestErrorOptions) {
    super(message ?? CLASS_NAME, {
      error: opts?.error,
      code: opts?.code ?? CLASS_NAME,
    });

    /* Class-specific parameters */
    this.clientErrors = opts?.clientErrors ?? [];

    // set stacktrace
    Error.captureStackTrace(this, BadRequestError);
    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
