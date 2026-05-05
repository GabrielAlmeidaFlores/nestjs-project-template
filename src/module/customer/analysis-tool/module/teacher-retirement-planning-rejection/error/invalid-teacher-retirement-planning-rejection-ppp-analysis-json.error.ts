import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidTeacherRetirementPlanningRejectionPppAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidTeacherRetirementPlanningRejectionPppAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a análise de PPP de indeferimento de aposentadoria do professor. JSON inválido retornado pela IA.',
    );
  }
}
