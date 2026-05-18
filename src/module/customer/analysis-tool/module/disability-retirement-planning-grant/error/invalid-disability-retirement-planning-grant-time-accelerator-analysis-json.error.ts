import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDisabilityRetirementPlanningGrantTimeAcceleratorAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDisabilityRetirementPlanningGrantTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a análise de acelerador de tempo da concessão de aposentadoria da pessoa com deficiência. JSON inválido ou incompleto.',
    );
  }
}
