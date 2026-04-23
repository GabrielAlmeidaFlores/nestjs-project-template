import { InvalidInputError } from '@core/error/invalid-input.error';

export class DisabilityRetirementPlanningRejectionCnisNotPresentError extends InvalidInputError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionCnisNotPresentError.name;

  public constructor() {
    super('Documento CNIS da análise de indeferimento não informado.');
  }
}
