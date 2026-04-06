import { UnexpectedError } from '@core/error/unexpected.error';

export class UnsupportedDisabilityRetirementPlanningGrantTimeAcceleratorTypeError extends UnexpectedError {
  protected override readonly _type =
    UnsupportedDisabilityRetirementPlanningGrantTimeAcceleratorTypeError.name;

  public constructor() {
    super(
      'Tipo de acelerador de tempo da concessão de aposentadoria da pessoa com deficiência não suportado.',
    );
  }
}
