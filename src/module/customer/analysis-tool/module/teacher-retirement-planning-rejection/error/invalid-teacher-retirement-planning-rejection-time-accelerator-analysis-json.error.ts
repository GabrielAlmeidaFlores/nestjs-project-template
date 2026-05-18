import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidTeacherRetirementPlanningRejectionTimeAcceleratorAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidTeacherRetirementPlanningRejectionTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da análise de acelerador de tempo de indeferimento de aposentadoria do professor é inválido.',
    );
  }
}
