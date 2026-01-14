import { InvalidInputError } from '@core/error/invalid-input.error';

export class MaxActivePaymentPlansReachedError extends InvalidInputError {
  protected override readonly _type = MaxActivePaymentPlansReachedError.name;

  public constructor(props: { maxActivePlans: number }) {
    super(
      `Limite de planos ativos atingido. Apenas ${props.maxActivePlans} planos podem estar ativos simultaneamente.`,
    );
  }
}
