import statusCodes, { getReasonPhrase } from 'http-status-codes';

import { HttpError, HttpErrorOptions } from './http.error';

export type HttpBadRequestErrorOptions<TError = any> = HttpErrorOptions & {
  /**
   * Client errors
   */
  clientErrors: Array<TError>;
};

export class HttpBadRequestError<TError = any> extends HttpError {
  /**
   * Client error(s)
   */
  public readonly clientErrors: Array<TError>;

  constructor(
    message?: string,
    error?: Error,
    opts?: HttpBadRequestErrorOptions,
  ) {
    super(message || HttpBadRequestError.name, error, {
      statusCode: opts?.statusCode || statusCodes.BAD_REQUEST,
      statusMessage:
        opts?.statusMessage ||
        getReasonPhrase(opts?.statusCode || statusCodes.BAD_REQUEST),
      isHandled: opts?.isHandled || false,

      code: opts?.code || HttpBadRequestError.name,
    });

    /* Class-specific parameters */
    this.clientErrors = opts?.clientErrors || [];

    // set stacktrace
    Error.captureStackTrace(this, HttpBadRequestError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, HttpBadRequestError.prototype);
  }
}
