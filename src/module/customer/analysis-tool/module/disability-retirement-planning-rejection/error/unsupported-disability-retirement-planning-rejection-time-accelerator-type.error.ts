import { InvalidInputError } from '@core/error/invalid-input.error';

export class UnsupportedDisabilityRetirementPlanningRejectionTimeAcceleratorTypeError extends InvalidInputError {
  protected override readonly _type =
    UnsupportedDisabilityRetirementPlanningRejectionTimeAcceleratorTypeError.name;

  public constructor() {
    super(
      'O tipo de acelerador de tempo informado não é suportado para análise de indeferimento de aposentadoria da pessoa com deficiência.',
    );
  }
}
