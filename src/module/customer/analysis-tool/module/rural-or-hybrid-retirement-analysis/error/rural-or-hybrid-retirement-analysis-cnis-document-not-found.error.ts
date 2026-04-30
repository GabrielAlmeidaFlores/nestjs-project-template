import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
