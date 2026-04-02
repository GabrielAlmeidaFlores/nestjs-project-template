import { InvalidInputError } from '@core/error/invalid-input.error';

export class InviteAcceptanceRequiresCustomerAccountError extends InvalidInputError {
  protected override readonly _type =
    InviteAcceptanceRequiresCustomerAccountError.name;

  public constructor() {
    super('Apenas contas de cliente podem aceitar este convite.');
  }
}
