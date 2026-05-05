import { NotFoundError } from '@core/error/not-found.error';

export class TeacherRetirementPlanningRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    TeacherRetirementPlanningRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise de indeferimento de aposentadoria do professor não encontrado.',
    );
  }
}
