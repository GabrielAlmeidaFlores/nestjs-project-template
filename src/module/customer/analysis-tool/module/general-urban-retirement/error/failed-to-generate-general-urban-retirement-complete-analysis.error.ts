import { UnexpectedError } from '@core/error/unexpected.error';

export class FailedToGenerateGeneralUrbanRetirementCompleteAnalysisError extends UnexpectedError {
  protected override readonly _type =
    FailedToGenerateGeneralUrbanRetirementCompleteAnalysisError.name;

  public constructor() {
    super(
      'Falha ao gerar análise de aposentadoria urbana geral. Tente novamente mais tarde.',
    );
  }
}
