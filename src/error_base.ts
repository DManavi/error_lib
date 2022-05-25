/**
 * Error base class
 */

import {
  getEitherDefaultOrPredefinedErrorMessage,
  isNullOrUndefined,
  getErrorMessage,
} from './util';

export type ErrorCodeType = string | number;

export type ErrorParameters<TCode = ErrorCodeType> = {
  /**
   * Error code
   */
  code: TCode;

  /**
   * Overridden error message
   */
  message?: string | undefined;

  /**
   * The main error occurred
   */
  error?: Error | undefined;
};

export abstract class ErrorBase<TCode = ErrorCodeType> extends Error {
  /**
   * Error code
   */
  public readonly code: TCode;

  /**
   * Human-friendly error message
   */
  readonly message: string;

  constructor(opts?: ErrorParameters) {
    if (isNullOrUndefined(opts) === true) {
      throw new Error('E_NO_OPTIONS');
    }

    // generate error message
    const errorMessage = getErrorMessage(opts!.message, opts!.code);

    super(errorMessage);

    this.code = opts!.code;
    this.message = errorMessage;

    if (opts!.error) {
      // copy the default stacktrace
      this.stack = opts!.error.stack;
    }

    // set stacktrace
    Error.captureStackTrace(this, ErrorBase);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, ErrorBase.prototype);
  }
}
