import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidCommissionPercentageError extends InvalidInputError {
  protected override readonly _type = InvalidCommissionPercentageError.name;

  public constructor(props: { maxPercentage: number }) {
    super(
      `O percentual de comissão não pode ultrapassar ${props.maxPercentage}%.`,
    );
  }
}
