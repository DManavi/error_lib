import statusCodes, { getReasonPhrase } from 'http-status-codes';

import { HttpError, HttpErrorOptions } from './http.error';

export type HttpNotFoundBaseErrorOptions = HttpErrorOptions & {};

export class HttpNotFoundBaseError<
  TResourceId = string | number | any,
> extends HttpError {
  public readonly resourceType: string;
  public readonly resourceId: TResourceId;

  constructor(
    {
      resourceType,
      resourceId,
    }: { resourceType: string; resourceId: TResourceId },
    message?: string,
    error?: Error,
    opts?: HttpNotFoundBaseErrorOptions,
  ) {
    /* Initialization phase */
    const parentConstructorProps: HttpErrorOptions = {
      statusCode: opts?.statusCode || statusCodes.NOT_FOUND,
    };

    parentConstructorProps.statusMessage =
      opts?.statusMessage || getReasonPhrase(parentConstructorProps.statusCode);
    parentConstructorProps.isHandled = opts?.isHandled || false;

    /* Call the constructor with overridden parameters */
    super(message, error, parentConstructorProps);

    /* Class-specific parameters */
    this.resourceType = resourceType;
    this.resourceId = resourceId;

    // set stacktrace
    Error.captureStackTrace(this, HttpNotFoundBaseError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, HttpNotFoundBaseError.prototype);
  }
}
