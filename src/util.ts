/**
 * Utility functions
 */

import { ErrorCodeType, ErrorParameters } from './error_base';

/**
 * Get either default or predefined error message
 * @param code Error code or message (e.g. E_NOT_FOUND)
 * @param config Configuration object
 */
export const getEitherDefaultOrPredefinedErrorMessage = (
  opts: ErrorParameters,
): string => {
  // set default error message
  let errorMessage = getDefaultErrorMessage(opts.code);

  // error message is inherited from the error message
  if (config && config.error) {
    errorMessage = config.error.message;
  }

  // error message is overwritten by the user
  if (config && config.message) {
    errorMessage = config.message;
  }

  return errorMessage;
};

export const isNull = (inp: any) => inp === null;
export const isUndefined = (inp: any) => typeof inp === 'undefined';
export const isNullOrUndefined = (inp: any) => isNull(inp) || isUndefined(inp);

export const isString = (inp: any) => typeof inp === 'string';
export const isNonEmptyString = (inp: any) =>
  isString(inp) === true && inp.length > 0;

export const getErrorMessage = (
  message: string | undefined,
  code: ErrorCodeType,
) =>
  isNonEmptyString(message) === true
    ? message!
    : `Error '${code}' was occurred.`;
