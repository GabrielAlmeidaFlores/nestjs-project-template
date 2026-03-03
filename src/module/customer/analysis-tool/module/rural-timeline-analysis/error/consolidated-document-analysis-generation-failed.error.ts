import { UnexpectedError } from '@core/error/unexpected.error';

export class ConsolidatedDocumentAnalysisGenerationFailedError extends UnexpectedError {
  protected override readonly _type =
    ConsolidatedDocumentAnalysisGenerationFailedError.name;

  public constructor() {
    super(
      'Falha ao gerar análise consolidada de documentos dos períodos com IA',
    );
  }
}
