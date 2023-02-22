import { ApplicationError } from './application_error';
import { NotFoundError } from './not_found_error';

describe('NotFoundError', () => {
  it('check inheritance tree', () => {
    const err = new NotFoundError();

    expect(err instanceof Error).toBeTruthy();
    expect(err instanceof ApplicationError).toBeTruthy();
    expect(err instanceof NotFoundError).toBeTruthy();
  });

  it('should set default error message', () => {
    const err = new NotFoundError();

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('NotFoundError');
  });

  it('should set custom error message', () => {
    const err = new NotFoundError('MyErrorMessage');

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('MyErrorMessage');
  });

  it('should set default error code', () => {
    const err = new NotFoundError();

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_NOT_FOUND');
  });

  it('should set custom error code', () => {
    const err = new NotFoundError(undefined, { code: 'E_CUSTOM_ERROR' });

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_CUSTOM_ERROR');
  });

  it('should set default cause (undefined)', () => {
    const err = new NotFoundError();

    expect(err).toHaveProperty('cause');
    expect(typeof err.cause).toBe('undefined');
    expect(err.cause).toBe(undefined);
  });

  it('should set custom cause (another application error)', () => {
    const cause = new ApplicationError(undefined, { code: 'E_CAUSE' });
    const err = new NotFoundError(undefined, { cause });

    expect(err).toHaveProperty('cause');
    expect(err.cause instanceof ApplicationError).toBeTruthy();
    expect((err.cause as ApplicationError).code).toBe('E_CAUSE');
  });
});
