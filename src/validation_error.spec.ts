import { ApplicationError } from './application_error';
import { BadRequestError } from './bad_request_error';
import { ValidationError } from './validation_error';

describe('ValidationError', () => {
  it('check inheritance tree', () => {
    const err = new ValidationError(undefined);

    expect(err instanceof Error).toBeTruthy();
    expect(err instanceof ApplicationError).toBeTruthy();
    expect(err instanceof BadRequestError).toBeTruthy();
    expect(err instanceof ValidationError).toBeTruthy();
  });

  it('should set default error message', () => {
    const err = new ValidationError(undefined);

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('ValidationError');
  });

  it('should set custom error message', () => {
    const err = new ValidationError(undefined, 'MyErrorMessage');

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('MyErrorMessage');
  });

  it('should set default error code', () => {
    const err = new ValidationError(undefined);

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_VALIDATION_FAILED');
  });

  it('should set custom error code', () => {
    const err = new ValidationError(undefined, undefined, {
      code: 'E_CUSTOM_ERROR',
    });

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_CUSTOM_ERROR');
  });

  it('should set default cause (undefined)', () => {
    const err = new ValidationError(undefined);

    expect(err).toHaveProperty('cause');
    expect(typeof err.cause).toBe('undefined');
    expect(err.cause).toBe(undefined);
  });

  it('should set custom cause (another application error)', () => {
    const cause = new BadRequestError(undefined, { code: 'E_CAUSE' });
    const err = new ValidationError(undefined, undefined, { cause });

    expect(err).toHaveProperty('cause');
    expect(err.cause instanceof BadRequestError).toBeTruthy();
    expect((err.cause as BadRequestError).code).toBe('E_CAUSE');
  });
});
