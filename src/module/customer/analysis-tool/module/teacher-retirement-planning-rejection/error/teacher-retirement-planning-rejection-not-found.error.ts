import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionNotFoundError.name;

  public constructor() {
    super(
      'Análise de indeferimento de aposentadoria do professor não encontrada.',
    );
  }
}
