import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidTeacherRetirementPlanningRejectionFirstAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidTeacherRetirementPlanningRejectionFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da primeira análise de indeferimento de aposentadoria do professor é inválido.',
    );
  }
}
