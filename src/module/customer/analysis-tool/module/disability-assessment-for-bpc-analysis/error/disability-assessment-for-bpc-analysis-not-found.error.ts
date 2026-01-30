import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityAssessmentForBpcAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisNotFoundError.name;

  public constructor() {
    super('Avaliação de deficiência para BPC não encontrada');
  }
}
