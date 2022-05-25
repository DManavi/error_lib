import { isNullOrUndefined, isNonEmptyString } from './util';

export type ErrorCodeType = string | number;

export abstract class BaseError<TCode = ErrorCodeType> extends Error {
  /**
   * Error code
   */
  public readonly code: TCode;

  /**
   * Human-friendly error message
   */
  readonly message: string;

  constructor(message: string, error?: Error, code?: TCode) {
    /* Validation phase */
    if (isNonEmptyString(message) === false) {
      throw new Error(`The message property should be a non-empty string.`);
    }

    /* Initialization phase */
    super(message);

    this.message = message;
    this.stack = error?.stack;
    this.code = isNullOrUndefined(code) === false ? code : BaseError.name as any;

    // set stacktrace
    Error.captureStackTrace(this, BaseError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
