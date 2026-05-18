import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDisabilityRetirementPlanningRejectionPppAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDisabilityRetirementPlanningRejectionPppAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a análise de PPP de indeferimento de aposentadoria da pessoa com deficiência. JSON inválido retornado pela IA.',
    );
  }
}
