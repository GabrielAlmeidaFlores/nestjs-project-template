import { NotFoundError } from '@core/error/not-found.error';

export class SpecialRetirementRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialRetirementRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super('Documento CNIS não encontrado para esta análise.');
  }
}
