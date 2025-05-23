import { BaseError } from '@core/error/base.error';

export abstract class InvalidInputError extends BaseError {
  protected readonly _type = InvalidInputError.name;
}
