import { UnexpectedError } from '@core/error/unexpected.error';

export class UnsupportedDeathBenefitGrantTimeAcceleratorTypeError extends UnexpectedError {
  protected override readonly _type =
    UnsupportedDeathBenefitGrantTimeAcceleratorTypeError.name;

  public constructor() {
    super('Tipo de acelerador de tempo da pensão por morte não suportado.');
  }
}
