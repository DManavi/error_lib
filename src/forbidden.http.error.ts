import statusCodes, { getReasonPhrase } from 'http-status-codes';

import { HttpError, HttpErrorOptions } from './http.error';

export type HttpForbiddenErrorOptions = HttpErrorOptions & {};

export class HttpForbiddenError<
  TUserId = string | number | any,
  TResourceId = string | number | any,
> extends HttpError {
  public readonly userId: TUserId;
  public readonly resourceType: string;
  public readonly resourceId: TResourceId;

  constructor(
    {
      userId,
      resourceId,
      resourceType,
    }: {
      userId: TUserId;
      resourceType: string;
      resourceId: TResourceId;
    },
    message?: string,
    error?: Error,
    opts?: HttpForbiddenErrorOptions,
  ) {
    /* Initialization phase */
    const parentConstructorProps: HttpErrorOptions = {
      statusCode: opts?.statusCode || statusCodes.FORBIDDEN,
    };

    parentConstructorProps.statusMessage =
      opts?.statusMessage || getReasonPhrase(parentConstructorProps.statusCode);
    parentConstructorProps.isHandled = opts?.isHandled || false;

    /* Call the constructor with overridden parameters */
    super(message, error, parentConstructorProps);

    /* Class-specific parameters */
    this.userId = userId;
    this.resourceType = resourceType;
    this.resourceId = resourceId;

    // set stacktrace
    Error.captureStackTrace(this, HttpForbiddenError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, HttpForbiddenError.prototype);
  }
}
