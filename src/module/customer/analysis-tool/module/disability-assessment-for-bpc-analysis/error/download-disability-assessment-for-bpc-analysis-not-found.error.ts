import { NotFoundError } from '@core/error/not-found.error';

export class DownloadDisabilityAssessmentForBpcAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    DownloadDisabilityAssessmentForBpcAnalysisNotFoundError.name;

  public constructor() {
    super('Download da avaliação de deficiência para BPC não encontrado');
  }
}
