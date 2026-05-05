import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise de documento do período de trabalho da análise de indeferimento de aposentadoria do professor não encontrada.',
    );
  }
}
