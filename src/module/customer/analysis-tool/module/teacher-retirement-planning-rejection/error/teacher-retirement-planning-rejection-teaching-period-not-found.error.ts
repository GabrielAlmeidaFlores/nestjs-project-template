import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionTeachingPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período de docência da análise de indeferimento de aposentadoria do professor não encontrado.',
    );
  }
}
