import { InvalidInputError } from '@core/error/invalid-input.error';

export class DisabilityRetirementPlanningRejectionDocumentInvalidError extends InvalidInputError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionDocumentInvalidError.name;

  public constructor() {
    super('Documento da análise de indeferimento inválido.');
  }
}
