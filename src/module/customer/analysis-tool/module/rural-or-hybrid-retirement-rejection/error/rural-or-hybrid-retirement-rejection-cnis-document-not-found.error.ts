import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super('Documento CNIS da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.');
  }
}
