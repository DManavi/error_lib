# error-lib

[![NPM version][npm-image]](https://npmjs.org/package/error-lib)
[![NPM downloads][downloads-image]](https://npmjs.org/package/error-lib)
[![Build Status][github-actions-publish-npm-package]](https://github.com/DManavi/error_lib/actions/workflows/publish_npm_package.yml)

## About

The error-lib project helps developers having a unified error structure in their NodeJS/Browser (JavaScript/TypeScript) projects.

## Installation

To install this package, run the command below.

```sh
# npm
npm install error-lib
# yarn
yarn add error-lib
# pnpm
pnpm add error-lib
```

## Diagram

![error-lib diagram](./resources/diagram.png)

## Usage

To use any of the custom error libraries you need to simply import them in your typescript/javascript application.

```js
// for NodeJS applications (Common JS)
const {
  ApplicationError,
  NotFoundError,
  ForbiddenError,
} = require('error-lib');

// Let's suppose we have a snippet that reads the content of a file
// 1) The first step is to check if the file exists.
// 2) The second step is to check if current user has access to the file.

const checkIfFileExist = (path) => {
  // 'fs.exists' is a pseudo code
  if (fs.exists(path) === false) {
    throw new NotFoundError(`${path} was not found.`);
  }

  return true;
};

const readFileContent = (path) => {
  if (fs.hasAccess(path) === false) {
    throw new ForbiddenError(`User does not have access to '${path}'`);
  }

  return 'dummy content';
};

try {
  // step 1
  checkIfFileExist('/path/to/file');

  // step 2
  const fileContent = readFileContent('/path/to/file');
} catch (err) {
  if (err instanceof NotFoundError) {
    // now you have intellisense enabled
    console.error('File not found!');
  } else if (err instanceof ForbiddenError) {
    // now you have intellisense enabled
    console.error('No access to the file');
  } else {
    console.error('Something went wrong!');
  }
}
```

```ts
// For typescript/javascript (ES Module)
import { ApplicationError, NotFoundError } from 'error-lib';

// Let's suppose we have a snippet that reads the content of a file
// 1) The first step is to check if the file exists.
// 2) The second step is to check if current user has access to the file.

const checkIfFileExist = (path) => {
  // 'fs.exists' is a pseudo code
  if (fs.exists(path) === false) {
    throw new NotFoundError(`${path} was not found.`);
  }

  return true;
};

const readFileContent = (path) => {
  if (fs.hasAccess(path) === false) {
    throw new ForbiddenError(`User does not have access to '${path}'`);
  }

  return 'dummy content';
};

try {
  // step 1
  checkIfFileExist('/path/to/file');

  // step 2
  const fileContent = readFileContent('/path/to/file');
} catch (err) {
  if (err instanceof NotFoundError) {
    // now you have intellisense enabled
    console.error('File not found!');
  } else if (err instanceof ForbiddenError) {
    // now you have intellisense enabled
    console.error('No access to the file');
  } else {
    console.error('Something went wrong!');
  }
}
```

## Extend / Custom errors

Not the errors created in this package supports all the scenarios. It's not even possible 😁.

To add a new type of error that suits your needs, follow the instruction below.

> It's always a good idea to extend errors from one of the main error types in this package. Unless you have your own reasons not to do so 😁.

```js
// Let's suppose you're adding an InvalidUsernamePassword error (which can be derived from BadRequestError).

// invalid_username_password_error.ts
const { BadRequestError } = require('error-lib');

class InvalidUsernamePassword extends BadRequestError {
  /**
   *
   * @param message {string} Custom error message
   * @param opts Extra options
   */
  constructor(message, opts) {
    message = message ?? 'InvalidUsernamePasswordError';

    super(message, {
      cause: opts?.cause,
      code: opts?.code ?? 'E_INVALID_USERNAME_PASSWORD',
    });

    Error.captureStackTrace(this, InvalidUsernamePassword);
    Object.setPrototypeOf(this, InvalidUsernamePassword.prototype);
  }
}

module.exports = {
  InvalidUsernamePassword,
};

// in your application (e.g. app.js)
// Now you can use your new error class to throw more specific errors

if (user !== 'user1' && pass !== 'p4$sw0rd!') {
  throw new InvalidUsernamePassword();
}
```

```ts
// Let's suppose you're adding an InvalidUsernamePassword error (which can be derived from BadRequestError).

// invalid_username_password_error.ts

import { BadRequestError, BadRequestErrorConstructorOptions } from 'error-lib';

export interface InvalidUsernamePasswordConstructorOptions<
  TCauseError extends Error = Error,
> extends BadRequestErrorConstructorOptions<TCauseError> {}

export class InvalidUsernamePassword<
  TCause extends Error = Error,
> extends BadRequestError<TCause> {
  /**
   *
   * @param message Custom error message
   * @param opts Extra options
   */
  constructor(
    message?: string,
    opts?: InvalidUsernamePasswordConstructorOptions<TCause>,
  ) {
    message = message ?? 'InvalidUsernamePasswordError';

    super(message, {
      cause: opts?.cause,
      code: opts?.code ?? 'E_INVALID_USERNAME_PASSWORD',
    });

    Error.captureStackTrace(this, InvalidUsernamePassword);
    Object.setPrototypeOf(this, InvalidUsernamePassword.prototype);
  }
}

// in your application (e.g. app.ts)
// Now you can use your new error class to throw more specific errors

if (user !== 'user1' && pass !== 'p4$sw0rd!') {
  throw new InvalidUsernamePassword();
}
```

And you're good to go!

## License

MIT

[npm-image]: https://img.shields.io/npm/v/error-lib
[npm-url]: https://npmjs.org/package/error-lib
[github-actions-publish-npm-package]: https://github.com/DManavi/error_lib/actions/workflows/publish_npm_package.yml/badge.svg
[downloads-image]: https://img.shields.io/npm/dw/error-lib
[downloads-url]: https://npmjs.org/package/error-lib
