import { InvalidInputError } from '@core/error/invalid-input.error';

export class RetirementPermanentDisabilityRejectionCnisNotPresentError extends InvalidInputError {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionCnisNotPresentError.name;

  public constructor() {
    super('O documento CNIS é obrigatório e não foi enviado.');
  }
}
