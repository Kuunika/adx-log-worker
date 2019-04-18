import { BaseError } from '.';

export class ConfigFileNotFound extends BaseError {
  constructor(message = 'Config file not Found.') {
    super(message);
  }
}
