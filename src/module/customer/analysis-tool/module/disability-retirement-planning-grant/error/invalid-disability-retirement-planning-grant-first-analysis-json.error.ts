import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDisabilityRetirementPlanningGrantFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDisabilityRetirementPlanningGrantFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a first analysis da concessão de aposentadoria da pessoa com deficiência. JSON inválido ou incompleto.',
    );
  }
}
