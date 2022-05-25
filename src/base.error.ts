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

  constructor(message: string, code?: TCode, error?: Error) {
    /* Validation phase */
    if (isNonEmptyString(message) === false) {
      throw new Error(`The message property should be a non-empty string.`);
    }

    /* Initialization phase */
    super(message);

    this.message = message;
    this.code = isNullOrUndefined(code) === false ? code : BaseError.name as any;
    this.stack = error?.stack;

    // set stacktrace
    Error.captureStackTrace(this, BaseError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
