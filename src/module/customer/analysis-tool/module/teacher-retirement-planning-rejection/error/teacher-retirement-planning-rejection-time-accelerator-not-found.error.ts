import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionTimeAcceleratorNotFoundError.name;

  public constructor() {
    super(
      'Acelerador de tempo da análise de indeferimento de aposentadoria do professor não encontrado.',
    );
  }
}
