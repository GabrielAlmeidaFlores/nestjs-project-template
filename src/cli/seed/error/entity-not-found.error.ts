import { UnexpectedError } from '@core/error/unexpected.error';

export class EntityNotFoundError extends UnexpectedError {
  protected override readonly _type = EntityNotFoundError.name;

  public constructor() {
    super('Entity not found.');
  }
}
