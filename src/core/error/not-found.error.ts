import { BaseError } from '@core/error/base.error';

export abstract class NotFoundError extends BaseError {
  protected readonly _type = NotFoundError.name;
}
