import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Download da análise simplificada de indeferimento de aposentadoria do professor não encontrado.',
    );
  }
}
