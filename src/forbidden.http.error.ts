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
    super(message || HttpForbiddenError.name, error, {
      statusCode: opts?.statusCode || statusCodes.FORBIDDEN,
      statusMessage:
        opts?.statusMessage ||
        getReasonPhrase(opts?.statusCode || statusCodes.FORBIDDEN),
      isHandled: opts?.isHandled || false,
    });

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
