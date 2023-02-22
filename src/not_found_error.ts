import {
  ApplicationError,
  ApplicationErrorConstructorOptions,
} from './application_error';

export interface NotFoundErrorConstructorOptions<
  TCauseError extends Error = Error,
> extends ApplicationErrorConstructorOptions<TCauseError> {}

export class NotFoundError<
  TCause extends Error = Error,
> extends ApplicationError<TCause> {
  /**
   *
   * @param message Custom error message
   * @param opts Extra options
   */
  constructor(
    message?: string,
    opts?: NotFoundErrorConstructorOptions<TCause>,
  ) {
    message = message ?? 'NotFoundError';

    super(message, { cause: opts?.cause, code: 'E_NOT_FOUND' });

    this.configureSubError(NotFoundError);
  }
}
