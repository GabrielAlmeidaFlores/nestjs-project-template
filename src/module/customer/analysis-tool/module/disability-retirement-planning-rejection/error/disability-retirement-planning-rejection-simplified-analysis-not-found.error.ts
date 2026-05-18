import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningRejectionSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada de indeferimento de aposentadoria da pessoa com deficiência não encontrada.',
    );
  }
}
