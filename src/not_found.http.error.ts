import statusCodes, { getReasonPhrase } from 'http-status-codes';

import { HttpError, HttpErrorOptions } from './http.error';

export type HttpNotFoundErrorOptions = HttpErrorOptions & {};

export class HttpNotFoundError<
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
    opts?: HttpNotFoundErrorOptions,
  ) {
    super(message || HttpNotFoundError.name, error, {
      statusCode: opts?.statusCode || statusCodes.NOT_FOUND,
      statusMessage:
        opts?.statusMessage ||
        getReasonPhrase(opts?.statusCode || statusCodes.NOT_FOUND),
      code: opts?.code || HttpNotFoundError.name,
      isHandled: opts?.isHandled || false,
    });

    /* Class-specific parameters */
    this.resourceType = resourceType;
    this.resourceId = resourceId;

    // set stacktrace
    Error.captureStackTrace(this, HttpNotFoundError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, HttpNotFoundError.prototype);
  }
}
