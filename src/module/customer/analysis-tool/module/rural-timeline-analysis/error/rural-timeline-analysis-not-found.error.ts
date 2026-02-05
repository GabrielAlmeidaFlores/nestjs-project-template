import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = RuralTimelineAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de linha do tempo rural não encontrada');
  }
}
