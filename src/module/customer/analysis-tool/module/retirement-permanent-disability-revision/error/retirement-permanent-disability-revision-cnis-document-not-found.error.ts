import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRevisionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionCnisDocumentNotFoundError.name;

  public constructor() {
    super('Documento CNIS não encontrado para esta análise.');
  }
}
