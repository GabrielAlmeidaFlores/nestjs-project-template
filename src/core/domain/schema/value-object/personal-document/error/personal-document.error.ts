import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPersonalDocumentError extends InvalidInputError {
  protected override readonly _type = InvalidPersonalDocumentError.name;

  public constructor() {
    super('O CPF informado não é válido');
  }
}
