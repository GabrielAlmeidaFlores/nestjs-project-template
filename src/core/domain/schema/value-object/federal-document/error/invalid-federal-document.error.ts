import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidFederalDocumentError extends InvalidInputError {
  protected override readonly _type = InvalidFederalDocumentError.name;

  public constructor() {
    super('O documento informado não é válido');
  }
}
