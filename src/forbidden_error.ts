import { ApplicationError } from './application_error';
import { ErrorOptions } from './types';
import { safeGetProperty } from './utils';

const CLASS_NAME = 'Forbidden';

export type ForbiddenErrorOptions<
  TUserId = void,
  TResourceType = void,
  TResourceId = void,
> = ErrorOptions &
  (TUserId extends void ? {} : { userId: TUserId }) &
  (TResourceType extends void ? {} : { resourceType: TResourceType }) &
  (TResourceId extends void
    ? {}
    : {
        resourceId: TResourceId;
      });

/**
 * ForbiddenError
 */
export class ForbiddenError<
  TUserId = void,
  TResourceType = void,
  TResourceId = void,
> extends ApplicationError {
  public readonly userId?: TUserId;
  public readonly resourceType?: TResourceType;
  public readonly resourceId?: TResourceId;

  /**
   * @constructor
   * @param {string | undefined} message Error message
   * @param {ForbiddenErrorOptions | undefined} opts Error options
   */
  constructor(
    message?: string,
    opts?: ForbiddenErrorOptions<TUserId, TResourceId>,
  ) {
    super(message ?? CLASS_NAME, {
      error: opts?.error,
      code: opts?.code ?? CLASS_NAME,
    });

    /* Class-specific parameters */
    this.userId = safeGetProperty<any>(opts, 'userId');
    this.resourceType = safeGetProperty<any>(opts, 'resourceType');
    this.resourceId = safeGetProperty<any>(opts, 'resourceId');

    // set stacktrace
    Error.captureStackTrace(this, ForbiddenError);
    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
