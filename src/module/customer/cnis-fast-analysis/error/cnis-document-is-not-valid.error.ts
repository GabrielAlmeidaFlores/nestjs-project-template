import { InvalidInputError } from '@core/error/invalid-input.error';

export class CnisDocumentIsNotValidError extends InvalidInputError {
  protected override readonly _type = CnisDocumentIsNotValidError.name;

  public constructor() {
    super('O documento cnis não é válido');
  }
}
