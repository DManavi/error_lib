import statusCodes, { getReasonPhrase } from 'http-status-codes';

import { BaseError } from './base.error';
import { ErrorOptions } from './types';


export type HttpErrorOptions = ErrorOptions & {
  /**
   * Status code
   */
  statusCode: number;

  /**
   * Status message
   */
  statusMessage?: string;

  /**
   * Is this a handled error
   */
  isHandled?: boolean;
};

export class HttpError extends BaseError {

  /**
   * HTTP status regarding the error
   */
  public readonly statusCode: number;

  /**
   * HTTP status message regarding the error
   */
  public readonly statusMessage?: string;

  /**
   * Is this a handled error
   */
  public readonly isHandled?: boolean;

  constructor(message?: string, error?: Error, opts?: HttpErrorOptions) {
    /* Initialization phase */
    super(message, error, opts);

    this.statusCode = opts?.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
    this.statusMessage = opts?.statusMessage || getReasonPhrase(this.statusCode);
    this.isHandled = opts?.isHandled || false;

    // set stacktrace
    Error.captureStackTrace(this, HttpError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
