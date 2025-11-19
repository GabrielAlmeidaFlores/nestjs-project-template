import { ForbiddenError } from '@core/error/forbidden.error';

export class CustomerWrongCurrentPasswordError extends ForbiddenError {
  protected override readonly _type = CustomerWrongCurrentPasswordError.name;

  public constructor() {
    super('A senha atual não é correta');
  }
}
