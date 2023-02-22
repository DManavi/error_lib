import {
  ApplicationError,
  ApplicationErrorConstructorOptions,
} from './application_error';

export interface ForbiddenErrorConstructorOptions<
  TCauseError extends Error = Error,
> extends ApplicationErrorConstructorOptions<TCauseError> {}

export class ForbiddenError<
  TCause extends Error = Error,
> extends ApplicationError<TCause> {
  /**
   *
   * @param message Custom error message
   * @param opts Extra options
   */
  constructor(
    message?: string,
    opts?: ForbiddenErrorConstructorOptions<TCause>,
  ) {
    message = message ?? 'ForbiddenError';

    super(message, { cause: opts?.cause, code: opts?.code ?? 'E_FORBIDDEN' });

    Error.captureStackTrace(this, ForbiddenError);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
