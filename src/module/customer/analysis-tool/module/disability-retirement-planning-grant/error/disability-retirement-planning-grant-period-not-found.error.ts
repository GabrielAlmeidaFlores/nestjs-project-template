import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningGrantPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período da análise de concessão de aposentadoria para deficientes não encontrado',
    );
  }
}
