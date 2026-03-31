import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPaymentPlanDiscountPercentageError extends InvalidInputError {
  protected override readonly _type =
    InvalidPaymentPlanDiscountPercentageError.name;

  public constructor(props: { maxPercentage: number }) {
    super(
      `O percentual de desconto no plano não pode ultrapassar ${props.maxPercentage}%.`,
    );
  }
}
