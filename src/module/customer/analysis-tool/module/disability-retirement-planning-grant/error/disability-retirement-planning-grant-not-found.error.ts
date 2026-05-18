import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningGrantNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantNotFoundError.name;

  public constructor() {
    super(
      'Análise de concessão de aposentadoria para deficientes não encontrada',
    );
  }
}
