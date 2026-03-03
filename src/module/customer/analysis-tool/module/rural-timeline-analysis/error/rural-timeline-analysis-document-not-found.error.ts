import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisDocumentNotFoundError.name;

  public constructor() {
    super('Documento da análise de linha do tempo rural não encontrado');
  }
}
