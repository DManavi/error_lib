import { ApplicationError } from './application_error';
import { ErrorOptions } from './types';
import { safeGetProperty } from './utils';

const CLASS_NAME = 'NotFoundError';

export type NotFoundErrorOptions<
  TResourceType = void,
  TResourceId = void,
> = ErrorOptions &
  (TResourceType extends void ? {} : { resourceType: TResourceType }) &
  (TResourceId extends void
    ? {}
    : {
        resourceId: TResourceId;
      });

/**
 * NotFoundError
 */
export class HttpNotFoundError<
  TResourceId = string | number | any,
> extends ApplicationError {
  public readonly resourceType: string;
  public readonly resourceId?: TResourceId;

  /**
   * @constructor
   * @param {string | undefined} message Error message
   * @param {NotFoundErrorOptions | undefined} opts Error options
   */
  constructor(message?: string, opts?: NotFoundErrorOptions) {
    super(message ?? CLASS_NAME, {
      error: opts?.error,
      code: opts?.code ?? CLASS_NAME,
    });

    /* Class-specific parameters */
    this.resourceType = safeGetProperty<any>(opts, 'resourceType');
    this.resourceId = safeGetProperty<any>(opts, 'resourceId');

    // set stacktrace
    Error.captureStackTrace(this, HttpNotFoundError);
    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, HttpNotFoundError.prototype);
  }
}
