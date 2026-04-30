import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionWorkPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período de trabalho da análise de indeferimento de aposentadoria do professor não encontrado.',
    );
  }
}
