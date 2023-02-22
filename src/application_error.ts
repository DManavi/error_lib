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

    this.configureSubError(ApplicationError);
  }

  /**
   * Configure sub error
   * @param cls Constructor/class of the error
   */
  protected configureSubError<T>(cls: Class<T>) {
    this.captureStackTrace(cls);
    this.setPrototypeOf(cls);
  }

  /**
   * Capture stack trace in the error
   * @param cls Constructor/class of the error
   */
  private captureStackTrace<T>(cls: Class<T>) {
    Error.captureStackTrace(this, cls);
  }

  /**
   * Set prototype of the object to enable instanceOf operator
   * @param cls Constructor/class of the error
   */
  private setPrototypeOf<T>(cls: Class<T>) {
    Object.setPrototypeOf(this, cls.prototype);
  }
}
