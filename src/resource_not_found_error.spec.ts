import { ApplicationError } from './application_error';
import { ForbiddenError } from './forbidden_error';
import { NotFoundError } from './not_found_error';
import { ResourceNotFoundError } from './resource_not_found_error';
import { ValidationError } from './validation_error';

describe('ResourceNotFoundError', () => {
  it('check inheritance tree', () => {
    const err = new ResourceNotFoundError(undefined, undefined);

    expect(err instanceof Error).toBeTruthy();
    expect(err instanceof ApplicationError).toBeTruthy();
    expect(err instanceof NotFoundError).toBeTruthy();
    expect(err instanceof ResourceNotFoundError).toBeTruthy();
  });

  it('should set default error message', () => {
    const err = new ResourceNotFoundError('1', 'Product');

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe(
      "ResourceNotFoundError: No Product found having identifier '1'",
    );
  });

  it('should set custom error message', () => {
    const err = new ResourceNotFoundError(
      undefined,
      undefined,
      'MyErrorMessage',
    );

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('MyErrorMessage');
  });

  it('should set default error code', () => {
    const err = new ResourceNotFoundError(undefined, undefined);

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_RESOURCE_NOT_FOUND');
  });

  it('should set custom error code', () => {
    const err = new ResourceNotFoundError(undefined, undefined, undefined, {
      code: 'E_CUSTOM_ERROR',
    });

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_CUSTOM_ERROR');
  });

  it('should set default cause (undefined)', () => {
    const err = new ResourceNotFoundError(undefined, undefined);

    expect(err).toHaveProperty('cause');
    expect(typeof err.cause).toBe('undefined');
    expect(err.cause).toBe(undefined);
  });

  it('should set custom cause (another application error)', () => {
    const cause = new ForbiddenError(undefined, { code: 'E_CAUSE' });
    const err = new ResourceNotFoundError(undefined, undefined, undefined, {
      cause,
    });

    expect(err).toHaveProperty('cause');
    expect(err.cause instanceof ForbiddenError).toBeTruthy();
    expect(err.cause instanceof ValidationError).toBeFalsy();
    expect((err.cause as ForbiddenError).code).toBe('E_CAUSE');
  });
});
