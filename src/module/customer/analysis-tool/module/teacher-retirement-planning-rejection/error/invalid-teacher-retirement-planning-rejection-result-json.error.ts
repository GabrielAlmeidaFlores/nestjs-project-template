import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidTeacherRetirementPlanningRejectionResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidTeacherRetirementPlanningRejectionResultJsonError.name;

  public constructor() {
    super(
      'O JSON do resultado da análise de indeferimento de aposentadoria do professor é inválido.',
    );
  }
}
