import { BaseError } from '@core/error/base.error';

export abstract class ConflictError extends BaseError {
  protected readonly _type = ConflictError.name;
}
