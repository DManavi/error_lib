/**
 * Argument error
 */

import { BaseError } from './base.error';
import { ErrorOptions } from './types';
import { isNonEmptyString } from './util';

export type MissingArgumentErrorOptions = ErrorOptions & {

  /**
   * Name of the argument
   */
  argumentName: string;
};

/**
 * Missing Argument Error
 */
export class MissingArgumentError extends BaseError {

  /**
   * Name of the argument
   */
  public readonly argumentName: string;

  constructor(message?: string, error?: Error, opts?: MissingArgumentErrorOptions) {
    /* Initialization phase */
    if (isNonEmptyString(opts?.argumentName) === true) {
      throw new Error('The \'argumentName\' needs to be a non-empty string.')
    }

    super(message || `'${opts?.argumentName}' is missing.`, error, { code: opts?.code || MissingArgumentError.name });

    this.argumentName = opts?.argumentName!;

    // set stacktrace
    Error.captureStackTrace(this, MissingArgumentError);

    // Set prototype to make instanceOf enabled
    Object.setPrototypeOf(this, MissingArgumentError.prototype);
  }
}
