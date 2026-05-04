import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidGeneralUrbanRetirementReviewFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidGeneralUrbanRetirementReviewFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a first analysis da revisão de aposentadoria urbana geral. JSON inválido ou incompleto.',
    );
  }
}
