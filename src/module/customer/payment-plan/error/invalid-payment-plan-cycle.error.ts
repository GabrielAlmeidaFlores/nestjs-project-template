import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPaymentPlanCycleError extends InvalidInputError {
  protected override readonly _type = InvalidPaymentPlanCycleError.name;

  public constructor() {
    super(
      'O plano de pagamento selecionado não possui ciclo de cobrança recorrente mensal.',
    );
  }
}
