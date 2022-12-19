import { ApplicationError } from './application_error';
import { ErrorOptions } from './types';

const CLASS_NAME = 'Forbidden';

export type ForbiddenErrorOptions = ErrorOptions & {};

export class ForbiddenError<
  TUserId = string | number | any,
  TResourceId = string | number | any,
> extends ApplicationError {
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
    opts?: ForbiddenErrorOptions,
  ) {
    super(message ?? CLASS_NAME, {
      error,
      code: opts?.code ?? CLASS_NAME,
    });

    /* Class-specific parameters */
    this.userId = userId;
    this.resourceType = resourceType;
    this.resourceId = resourceId;

    // set stacktrace
    Error.captureStackTrace(this, ForbiddenError);
    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
