<div align="center">

# error-lib

**Typed, reusable application errors for JavaScript and TypeScript.**

[![npm version](https://img.shields.io/npm/v/error-lib?logo=npm&color=cb3837)](https://www.npmjs.com/package/error-lib)
[![weekly downloads](https://img.shields.io/npm/dw/error-lib?logo=npm)](https://www.npmjs.com/package/error-lib)
[![license](https://img.shields.io/npm/l/error-lib)](./LICENSE)

Create consistent errors with stable codes, typed causes, and reliable
`instanceof` checks. CommonJS and ES module entry points are included.

</div>

## Why error-lib?

- **Consistent error contracts** — every error exposes a `message`, `code`,
  optional `cause`, and stack trace.
- **Useful built-in categories** — start with common application, validation,
  authorization, and not-found errors.
- **TypeScript-friendly** — constructor options, causes, and specialized error
  data are typed.
- **Easy to extend** — derive domain-specific errors while retaining predictable
  behavior.
- **Ready for APIs and logs** — normalize an error into a serializable object
  when it needs to cross a process boundary.

## Installation

```sh
npm install error-lib
```

<details>
<summary>Using Yarn or pnpm</summary>

```sh
yarn add error-lib
```

```sh
pnpm add error-lib
```

</details>

## Quick start

```ts
import {
  ForbiddenError,
  NotFoundError,
  normalizeErrorObject,
} from 'error-lib';

function readDocument(documentId: string, canRead: boolean) {
  if (!documentId) {
    throw new NotFoundError('Document was not found');
  }

  if (!canRead) {
    throw new ForbiddenError('You cannot access this document', {
      code: 'E_DOCUMENT_ACCESS_DENIED',
    });
  }

  return { id: documentId };
}

try {
  readDocument('doc-123', false);
} catch (error) {
  if (error instanceof ForbiddenError) {
    console.error(error.code, error.message);
    console.error(normalizeErrorObject(error));
  } else {
    throw error;
  }
}
```

CommonJS is supported through the package's `require` entry point:

```js
const { ApplicationError, NotFoundError } = require('error-lib');
```

## Built-in errors

All specialized errors inherit from `ApplicationError`, which itself extends the
native `Error` class.

| Export | Default code | Additional data |
| --- | --- | --- |
| `ApplicationError` | `E_APPLICATION_ERROR` | — |
| `BadRequestError` | `E_BAD_REQUEST` | — |
| `ValidationError` | `E_VALIDATION_FAILED` | `validationError` |
| `ForbiddenError` | `E_FORBIDDEN` | — |
| `NotFoundError` | `E_NOT_FOUND` | — |
| `ResourceNotFoundError` | `E_RESOURCE_NOT_FOUND` | `resourceId`, `resourceType` |
| `RouteNotFoundError` | `E_ROUTE_NOT_FOUND` | `route`, `method` |

Each constructor accepts an optional custom message and options containing a
custom `code` and typed `cause`. Specialized errors that carry extra data accept
that data before the message and options.

```ts
import { ResourceNotFoundError } from 'error-lib';

throw new ResourceNotFoundError(
  'user-42',
  'User',
  'The requested user does not exist',
  { code: 'E_USER_NOT_FOUND' },
);
```

## Error hierarchy

![Inheritance hierarchy for the errors exported by error-lib](./resources/diagram.png)

## Preserve the original cause

Use `cause` to retain the error that led to the application error:

```ts
import { ApplicationError } from 'error-lib';

try {
  await saveRecord();
} catch (cause) {
  if (cause instanceof Error) {
    throw new ApplicationError('Could not save the record', {
      code: 'E_RECORD_SAVE_FAILED',
      cause,
    });
  }

  throw cause;
}
```

## Serialize an error

Native error properties such as `message` and `stack` are not enumerable.
`normalizeErrorObject` copies them into a JSON-safe object for structured
logging or API responses.

```ts
import { NotFoundError, normalizeErrorObject } from 'error-lib';

const error = new NotFoundError('Order 123 was not found');
const payload = normalizeErrorObject(error);

console.log(JSON.stringify(payload));
```

## Create a custom error

Extend the closest built-in error and provide a stable domain-specific code:

```ts
import {
  BadRequestError,
  BadRequestErrorConstructorOptions,
} from 'error-lib';

export class InvalidCredentialsError<
  TCause extends Error = Error,
> extends BadRequestError<TCause> {
  constructor(
    message = 'The supplied credentials are invalid',
    options?: BadRequestErrorConstructorOptions<TCause>,
  ) {
    super(message, {
      cause: options?.cause,
      code: options?.code ?? 'E_INVALID_CREDENTIALS',
    });

    Error.captureStackTrace(this, InvalidCredentialsError);
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
```

The custom error remains compatible with checks at every level of the hierarchy:

```ts
const error = new InvalidCredentialsError();

error instanceof InvalidCredentialsError; // true
error instanceof BadRequestError;         // true
error instanceof Error;                   // true
```

## Development

```sh
npm ci
npm test
npm run build
```

Bug reports and feature requests are welcome in
[GitHub Issues](https://github.com/DManavi/error_lib/issues).

## License

[MIT](./LICENSE) © Danial Manavi
