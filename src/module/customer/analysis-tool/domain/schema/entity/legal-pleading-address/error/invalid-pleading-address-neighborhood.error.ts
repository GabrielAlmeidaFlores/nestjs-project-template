import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidLegalPleadingAddressNeighborhoodError extends InvalidInputError {
  protected override readonly _type =
    InvalidLegalPleadingAddressNeighborhoodError.name;

  public constructor() {
    super(
      `O nome do bairro deve conter apenas letras, números, espaços, caracteres especiais e hífens.`,
    );
  }
}
