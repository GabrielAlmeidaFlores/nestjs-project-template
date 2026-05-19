import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidDisabilityRetirementPlanningRejectionResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidDisabilityRetirementPlanningRejectionResultJsonError.name;

  public constructor() {
    super(
      'O resultado da análise de indeferimento de aposentadoria da pessoa com deficiência retornado pela IA está em formato inválido.',
    );
  }
}
