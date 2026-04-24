import { NotFoundError } from '@core/error/not-found.error';

export class AccidentBenefitRejectionSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentBenefitRejectionSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada de indeferimento de benefício acidentário não encontrada.',
    );
  }
}
