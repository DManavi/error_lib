import { ApplicationError } from './application_error';
import { BadRequestError } from './bad_request_error';

describe('BadRequestError', () => {
  it('check inheritance tree', () => {
    const err = new BadRequestError();

    expect(err instanceof Error);
    expect(err instanceof ApplicationError).toBeTruthy();
    expect(err instanceof BadRequestError).toBeTruthy();
  });

  it('should set default error message', () => {
    const err = new BadRequestError();

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('BadRequestError');
  });

  it('should set custom error message', () => {
    const err = new BadRequestError('MyErrorMessage');

    expect(err).toHaveProperty('message');
    expect(typeof err.message).toBe('string');
    expect(err.message).toBe('MyErrorMessage');
  });

  it('should set default error code', () => {
    const err = new BadRequestError();

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_BAD_REQUEST');
  });

  it('should set custom error code', () => {
    const err = new BadRequestError(undefined, { code: 'E_CUSTOM_ERROR' });

    expect(err).toHaveProperty('code');
    expect(typeof err.code).toBe('string');
    expect(err.code).toBe('E_CUSTOM_ERROR');
  });

  it('should set default cause (undefined)', () => {
    const err = new BadRequestError();

    expect(err).toHaveProperty('cause');
    expect(typeof err.cause).toBe('undefined');
    expect(err.cause).toBe(undefined);
  });

  it('should set custom cause (another application error)', () => {
    const cause = new ApplicationError(undefined, { code: 'E_CAUSE' });
    const err = new BadRequestError(undefined, { cause });

    expect(err).toHaveProperty('cause');
    expect(err.cause instanceof ApplicationError).toBeTruthy();
    expect((err.cause as ApplicationError).code).toBe('E_CAUSE');
  });
});
