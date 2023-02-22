import {
  NotFoundError,
  NotFoundErrorConstructorOptions,
} from './not_found_error';

export interface ResourceNotFoundErrorConstructorOptions<
  TCauseError extends Error = Error,
> extends NotFoundErrorConstructorOptions<TCauseError> {}

export class ResourceNotFoundError<
  TResourceId = any,
  TResourceType = any,
  TCause extends Error = Error,
> extends NotFoundError<TCause> {
  /**
   *
   * @param resourceId Resource identifier
   * @param resourceType Resource type
   * @param message Error message
   * @param opts Extra options
   */
  constructor(
    readonly resourceId: TResourceId,
    readonly resourceType: TResourceType,
    message?: string,
    opts?: ResourceNotFoundErrorConstructorOptions<TCause>,
  ) {
    // ensure there's always a valid error message
    message =
      message ??
      `ResourceNotFoundError: No ${resourceType} found having identifier '${resourceId}'`;

    super(message, {
      cause: opts?.cause,
      code: opts?.code ?? 'E_RESOURCE_NOT_FOUND',
    });

    Error.captureStackTrace(this, ResourceNotFoundError);
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }
}
