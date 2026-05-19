import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningDoesNotContainSimplifiedAnalysisError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'O planejamento de aposentadoria da pessoa com deficiência não possui análise simplificada gerada',
    );
  }
}
