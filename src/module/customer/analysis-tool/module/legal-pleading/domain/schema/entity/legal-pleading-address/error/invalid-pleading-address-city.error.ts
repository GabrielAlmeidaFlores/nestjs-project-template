import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidLegalPleadingAddressCityError extends InvalidInputError {
  protected override readonly _type = InvalidLegalPleadingAddressCityError.name;

  public constructor() {
    super(
      `O nome da cidade deve conter apenas letras, espaços e caracteres especiais.`,
    );
  }
}
