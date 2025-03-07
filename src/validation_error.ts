import {
  BadRequestError,
  BadRequestErrorConstructorOptions,
} from './bad_request_error';

export interface ValidationErrorConstructorOptions<
  TCauseError extends Error = Error,
> extends BadRequestErrorConstructorOptions<TCauseError> {}

export class ValidationError<
  TValidationError = any,
  TCause extends Error = Error,
> extends BadRequestError<TCause> {
  /**
   *
   * @param validationError Validation error
   * @param message Custom error message
   * @param opts Extra options
   */
  constructor(
    readonly validationError: TValidationError,
    message?: string,
    opts?: ValidationErrorConstructorOptions<TCause>,
  ) {
    message = message ?? 'ValidationError';

    super(message, {
      cause: opts?.cause,
      code: opts?.code ?? 'E_VALIDATION_FAILED',
    });

    Error.captureStackTrace(this, ValidationError);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
