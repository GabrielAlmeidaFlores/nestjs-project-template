import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de indeferimento de aposentadoria do professor não encontrado.',
    );
  }
}
