import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisPeriodDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodDocumentNotFoundError.name;

  public constructor() {
    super('Documento do período não encontrado');
  }
}
