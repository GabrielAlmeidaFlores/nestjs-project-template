import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON retornado pela análise de acelerador de tempo de indeferimento de aposentadoria da pessoa com deficiência é inválido.',
    );
  }
}
