import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementDenialAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super(
      'Documento de procedimento administrativo da análise de indeferimento não informado.',
    );
  }
}
