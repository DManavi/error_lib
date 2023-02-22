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
    message = message ?? 'Forbidden';

    super(message, { cause: opts?.cause, code: 'E_FORBIDDEN' });

    this.configureSubError(ForbiddenError);
  }
}
