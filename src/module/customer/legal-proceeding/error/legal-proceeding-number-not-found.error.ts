import { ForbiddenError } from '@core/error/forbidden.error';

export class InvalidLegalProceedingNumberSessionError extends ForbiddenError {
  protected override readonly _type =
    InvalidLegalProceedingNumberSessionError.name;

  public constructor() {
    super('Deve passar o numero do processo');
  }
}
