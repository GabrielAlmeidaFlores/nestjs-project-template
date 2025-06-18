import { BaseError } from '@core/error/base.error';

export abstract class ForbiddenError extends BaseError {
  protected readonly _type = ForbiddenError.name;
}
