import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidBenefitNumberError extends InvalidInputError {
  protected override readonly _type = InvalidBenefitNumberError.name;

  public constructor() {
    super('Número do benefício inválido');
  }
}
