import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de indeferimento de aposentadoria do professor não encontrado.',
    );
  }
}
