import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidTotalInstallmentsError extends InvalidInputError {
  protected override readonly _type = InvalidTotalInstallmentsError.name;

  public constructor(props: { maxInstallments: number }) {
    super(
      `O número de parcelas excede o limite máximo permitido de ${props.maxInstallments} parcelas.`,
    );
  }
}
