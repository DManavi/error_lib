import { ApplicationError } from './application_error';
import { ForbiddenError } from './forbidden_error';
import { NotFoundError } from './not_found_error';
import { RouteNotFoundError } from './route_not_found_error';
import { ValidationError } from './validation_error';

describe('RouteNotFoundError', () => {
  it('check inheritance tree', () => {
    const err = new RouteNotFoundError(undefined, undefined);

    expect(err instanceof Error).toBeTruthy();
    expect(err instanceof ApplicationError).toBeTruthy();
    expect(err instanceof NotFoundError).toBeTruthy();
    expect(err instanceof RouteNotFoundError).toBeTruthy();
  });

  it('should set default error message', () => {
    let err = new RouteNotFoundError('/product', 'GET');

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe(
      "RouteNotFoundError: Route 'GET: /product' was not found",
    );

    err = new RouteNotFoundError('/product');

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe(
      "RouteNotFoundError: Route '/product' was not found",
    );
  });

  it('should set custom error message', () => {
    const err = new RouteNotFoundError('/product', 'GET', 'MyErrorMessage');

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('MyErrorMessage');
  });

  it('should set default error code', () => {
    const err = new RouteNotFoundError(undefined);

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_ROUTE_NOT_FOUND');
  });

  it('should set custom error code', () => {
    const err = new RouteNotFoundError(undefined, undefined, undefined, {
      code: 'E_CUSTOM_ERROR',
    });

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_CUSTOM_ERROR');
  });

  it('should set default cause (undefined)', () => {
    const err = new RouteNotFoundError(undefined);

    expect(err).toHaveProperty('cause');
    expect(typeof err.cause).toBe('undefined');
    expect(err.cause).toBe(undefined);
  });

  it('should set custom cause (another application error)', () => {
    const cause = new ForbiddenError(undefined, { code: 'E_CAUSE' });
    const err = new RouteNotFoundError(undefined, undefined, undefined, {
      cause,
    });

    expect(err).toHaveProperty('cause');
    expect(err.cause instanceof ForbiddenError).toBeTruthy();
    expect(err.cause instanceof ValidationError).toBeFalsy();
    expect((err.cause as ForbiddenError).code).toBe('E_CAUSE');
  });
});
