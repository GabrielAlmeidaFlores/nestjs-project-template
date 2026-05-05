import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da análise de documentos do período de trabalho de indeferimento de aposentadoria do professor é inválido.',
    );
  }
}
