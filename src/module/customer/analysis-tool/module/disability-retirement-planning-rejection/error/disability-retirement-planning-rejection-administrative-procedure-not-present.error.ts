import { InvalidInputError } from '@core/error/invalid-input.error';

export class DisabilityRetirementPlanningRejectionAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super(
      'Documento de procedimento administrativo da análise de indeferimento não informado.',
    );
  }
}
