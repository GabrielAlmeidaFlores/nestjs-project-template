import { InvalidInputError } from '@core/error/invalid-input.error';

export class RetirementPermanentDisabilityRejectionAdministrativeProcedureDenialNotPresentError extends InvalidInputError {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionAdministrativeProcedureDenialNotPresentError.name;

  public constructor() {
    super(
      'O documento de procedimento administrativo de indeferimento é obrigatório e não foi enviado.',
    );
  }
}
