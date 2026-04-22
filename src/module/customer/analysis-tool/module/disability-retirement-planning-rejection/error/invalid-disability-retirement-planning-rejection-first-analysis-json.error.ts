import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDisabilityRetirementPlanningRejectionFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDisabilityRetirementPlanningRejectionFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a first analysis de indeferimento de aposentadoria da pessoa com deficiência. JSON inválido retornado pela IA.',
    );
  }
}
