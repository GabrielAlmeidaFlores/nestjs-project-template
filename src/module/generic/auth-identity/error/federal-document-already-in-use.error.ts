import { InvalidInputError } from '@core/error/invalid-input.error';

export class FederalDocumentAlreadyInUseError extends InvalidInputError {
  protected override readonly _type = FederalDocumentAlreadyInUseError.name;

  public constructor() {
    super('O documento já está em uso');
  }
}
