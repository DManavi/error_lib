import { Class } from 'type-fest';

export interface ApplicationErrorConstructorOptions<
  TCauseError extends Error = Error,
> {
  /**
   * Error code
   */
  code?: string;

  /**
   * The cause of this error (or the parent error)
   */
  cause?: TCauseError;
}

export class ApplicationError<TCause extends Error = Error> extends Error {
  /**
   * Error code (e.g. E_APPLICATION_ERROR)
   */
  public readonly code: string;

  /**
   * The cause of this error (or the parent error)
   */
  public readonly cause?: Error;

  /**
   *
   * @param message Custom error message
   * @param opts Extra options
   */
  constructor(
    message?: string,
    opts?: ApplicationErrorConstructorOptions<TCause>,
  ) {
    message = message ?? 'ApplicationError';

    super(message);

    this.code = opts?.code ?? 'E_APPLICATION_ERROR';
    this.cause = opts?.cause;

    Error.captureStackTrace(this, ApplicationError);
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
