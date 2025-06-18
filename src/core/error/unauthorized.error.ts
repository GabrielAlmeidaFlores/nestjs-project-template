import { BaseError } from '@core/error/base.error';

export abstract class UnauthorizedError extends BaseError {
  protected readonly _type = UnauthorizedError.name;
}
