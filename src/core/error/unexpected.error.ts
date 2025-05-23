import { BaseError } from '@core/error/base.error';

export abstract class UnexpectedError extends BaseError {
  protected readonly _type = UnexpectedError.name;
}
