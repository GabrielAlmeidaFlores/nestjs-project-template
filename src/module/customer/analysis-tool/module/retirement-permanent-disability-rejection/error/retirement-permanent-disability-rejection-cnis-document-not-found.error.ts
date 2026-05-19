import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super('O documento CNIS não foi encontrado para esta análise.');
  }
}
