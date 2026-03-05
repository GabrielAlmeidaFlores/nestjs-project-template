import { BaseError } from '@core/error/base.error';

export abstract class ServiceUnavailableError extends BaseError {
  protected readonly _type = ServiceUnavailableError.name;
}
