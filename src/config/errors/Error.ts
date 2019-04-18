export class BaseError extends Error {
  constructor(message = 'Something went wrong. Please try again.') {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
