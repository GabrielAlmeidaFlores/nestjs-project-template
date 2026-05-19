import { UnexpectedError } from '@core/error/unexpected.error';

export class FailedToGenerateDocumentAnalysisError extends UnexpectedError {
  protected override readonly _type =
    FailedToGenerateDocumentAnalysisError.name;

  public constructor() {
    super('Falha ao gerar análise dos documentos.');
  }
}
