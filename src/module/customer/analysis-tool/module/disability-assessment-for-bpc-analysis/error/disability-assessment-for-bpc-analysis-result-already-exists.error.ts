import { InvalidInputError } from '@core/error/invalid-input.error';

export class DisabilityAssessmentForBpcAnalysisResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado da avaliação de deficiência para BPC já existe');
  }
}
