import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidLegalPleadingAddressStreetError extends InvalidInputError {
  protected override readonly _type =
    InvalidLegalPleadingAddressStreetError.name;

  public constructor() {
    super(
      `O nome da rua deve conter apenas letras, números, espaços, caracteres especiais e hífens.`,
    );
  }
}
