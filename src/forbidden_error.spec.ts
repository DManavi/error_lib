import { ApplicationError } from './application_error';
import { ForbiddenError } from './forbidden_error';

describe('ForbiddenError', () => {
  it('check inheritance tree', () => {
    const err = new ForbiddenError();

    expect(err instanceof Error).toBeTruthy();
    expect(err instanceof ApplicationError).toBeTruthy();
    expect(err instanceof ForbiddenError).toBeTruthy();
  });

  it('should set default error message', () => {
    const err = new ForbiddenError();

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('ForbiddenError');
  });

  it('should set custom error message', () => {
    const err = new ForbiddenError('MyErrorMessage');

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('MyErrorMessage');
  });

  it('should set default error code', () => {
    const err = new ForbiddenError();

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_FORBIDDEN');
  });

  it('should set custom error code', () => {
    const err = new ForbiddenError(undefined, { code: 'E_CUSTOM_ERROR' });

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_CUSTOM_ERROR');
  });

  it('should set default cause (undefined)', () => {
    const err = new ForbiddenError();

    expect(err).toHaveProperty('cause');
    expect(typeof err.cause).toBe('undefined');
    expect(err.cause).toBe(undefined);
  });

  it('should set custom cause (another application error)', () => {
    const cause = new ApplicationError(undefined, { code: 'E_CAUSE' });
    const err = new ForbiddenError(undefined, { cause });

    expect(err).toHaveProperty('cause');
    expect(err.cause instanceof ApplicationError).toBeTruthy();
    expect((err.cause as ApplicationError).code).toBe('E_CAUSE');
  });
});
