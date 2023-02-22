import {
  NotFoundError,
  NotFoundErrorConstructorOptions,
} from './not_found_error';

export interface RouteNotFoundErrorConstructorOptions<
  TCauseError extends Error = Error,
> extends NotFoundErrorConstructorOptions<TCauseError> {}

export class RouteNotFoundError<
  TRoute = any,
  TMethod = any,
  TCause extends Error = Error,
> extends NotFoundError<TCause> {
  /**
   *
   * @param route Route or path name
   * @param method Method
   * @param message Custom error message
   * @param opts Extra options
   */
  constructor(
    readonly route: TRoute,
    readonly method?: TMethod,

    message?: string,
    opts?: RouteNotFoundErrorConstructorOptions<TCause>,
  ) {
    // ensure there's always a valid error message
    message =
      message ??
      `RouteNotFoundError: Route '${[method, route]
        .filter((_) => typeof _ !== 'string' || _.length < 1)
        .join(': ')}' was not found`;

    super(message, { cause: opts?.cause, code: 'E_ROUTE_NOT_FOUND' });

    this.configureSubError(RouteNotFoundError);
  }
}
