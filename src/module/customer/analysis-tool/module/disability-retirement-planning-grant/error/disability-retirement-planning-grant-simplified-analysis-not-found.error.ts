import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningGrantSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada de concessão de aposentadoria para deficientes não encontrada.',
    );
  }
}
