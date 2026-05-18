import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidTeacherRetirementPlanningTimeAcceleratorAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidTeacherRetirementPlanningTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da análise de acelerador de tempo de aposentadoria do professor é inválido.',
    );
  }
}
