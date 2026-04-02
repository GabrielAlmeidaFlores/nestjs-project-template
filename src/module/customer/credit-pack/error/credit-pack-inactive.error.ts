import { InvalidInputError } from '@core/error/invalid-input.error';

export class CreditPackInactiveError extends InvalidInputError {
  protected override readonly _type = CreditPackInactiveError.name;

  public constructor() {
    super('Este pacote de créditos não está disponível para compra.');
  }
}
