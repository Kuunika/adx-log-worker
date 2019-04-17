import { BaseError } from '.';

export class ConfigParseError extends BaseError {
  constructor(message = 'Failed to parse config file.') {
    super(message);
  }
}
