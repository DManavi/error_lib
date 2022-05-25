export const isString = (inp: any) => typeof inp === 'string';

export const isNonEmptyString = (inp: any) =>
  isString(inp) === true && inp.length > 0;
