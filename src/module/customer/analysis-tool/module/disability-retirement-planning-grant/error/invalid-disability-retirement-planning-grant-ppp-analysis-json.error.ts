import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDisabilityRetirementPlanningGrantPppAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDisabilityRetirementPlanningGrantPppAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a análise de PPP da concessão de aposentadoria da pessoa com deficiência. JSON inválido ou incompleto.',
    );
  }
}
