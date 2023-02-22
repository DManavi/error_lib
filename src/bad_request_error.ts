import {
  ApplicationError,
  ApplicationErrorConstructorOptions,
} from './application_error';

export interface BadRequestErrorConstructorOptions<
  TCauseError extends Error = Error,
> extends ApplicationErrorConstructorOptions<TCauseError> {}

export class BadRequestError<
  TCause extends Error = Error,
> extends ApplicationError<TCause> {
  /**
   *
   * @param message Custom error message
   * @param opts Extra options
   */
  constructor(
    message?: string,
    opts?: BadRequestErrorConstructorOptions<TCause>,
  ) {
    message = message ?? 'BadRequestError';

    super(message, { cause: opts?.cause, code: opts?.code ?? 'E_BAD_REQUEST' });

    Error.captureStackTrace(this, BadRequestError);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
