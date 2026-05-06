import { InvalidInputError } from '@core/error/invalid-input.error';

export class RetirementPermanentDisabilityRejectionDocumentInvalidError extends InvalidInputError {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionDocumentInvalidError.name;

  public constructor() {
    super('Nenhum documento foi enviado para a análise.');
  }
}
