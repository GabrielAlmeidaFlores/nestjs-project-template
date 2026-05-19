import { UnexpectedError } from '@core/error/unexpected.error';

export class UnsupportedDeathBenefitRejectionTimeAcceleratorTypeError extends UnexpectedError {
  protected override readonly _type =
    UnsupportedDeathBenefitRejectionTimeAcceleratorTypeError.name;

  public constructor() {
    super('Tipo de acelerador de tempo da pensão por morte não suportado.');
  }
}
