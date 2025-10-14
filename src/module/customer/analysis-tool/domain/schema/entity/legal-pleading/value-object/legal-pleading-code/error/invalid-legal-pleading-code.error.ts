import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidLegalPleadingCodeError extends InvalidInputError {
  protected override readonly _type = InvalidLegalPleadingCodeError.name;

  public constructor() {
    super('O código da peça processual informado não é válido');
  }
}
