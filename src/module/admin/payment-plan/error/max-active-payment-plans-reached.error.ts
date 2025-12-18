import { InvalidInputError } from '@core/error/invalid-input.error';

export class MaxActivePaymentPlansReachedError extends InvalidInputError {
  protected override readonly _type = MaxActivePaymentPlansReachedError.name;

  public constructor() {
    super(
      'Limite de planos ativos atingido. Apenas 3 planos podem estar ativos simultaneamente.',
    );
  }
}
