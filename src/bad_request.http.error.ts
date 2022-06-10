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
    /* Initialization phase */
    const parentConstructorProps: HttpErrorOptions = {
      statusCode: opts?.statusCode || statusCodes.BAD_REQUEST,
    };

    parentConstructorProps.statusMessage =
      opts?.statusMessage || getReasonPhrase(parentConstructorProps.statusCode);
    parentConstructorProps.isHandled = opts?.isHandled || false;

    // initialize null/undefined properties
    const _message = message || HttpBadRequestError.name;

    /* Call the constructor with overrided parameters */
    super(_message, error, parentConstructorProps);

    /* Class-specific parameters */
    this.clientErrors = opts?.clientErrors || [];

    // set stacktrace
    Error.captureStackTrace(this, HttpBadRequestError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, HttpBadRequestError.prototype);
  }
}
