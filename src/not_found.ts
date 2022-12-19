import { ApplicationError } from './application_error';
import { ErrorOptions } from './types';

const CLASS_NAME = 'NotFoundError';

export type NotFoundErrorOptions = ErrorOptions & {};

export class HttpNotFoundError<
  TResourceId = string | number | any,
> extends ApplicationError {
  public readonly resourceType: string;
  public readonly resourceId?: TResourceId;

  constructor(
    {
      resourceType,
      resourceId,
    }: { resourceType: string; resourceId: TResourceId },
    message?: string,
    error?: Error,
    opts?: NotFoundErrorOptions,
  ) {
    super(message ?? CLASS_NAME, {
      error,
      code: opts?.code ?? CLASS_NAME,
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
