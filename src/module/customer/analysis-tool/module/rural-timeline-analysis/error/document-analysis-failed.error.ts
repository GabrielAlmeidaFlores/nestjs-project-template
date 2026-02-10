import { UnexpectedError } from '@core/error/unexpected.error';

export class DocumentAnalysisFailedError extends UnexpectedError {
  protected override readonly _type = DocumentAnalysisFailedError.name;

  public constructor() {
    super('Falha ao analisar o documento com IA.');
  }
}
