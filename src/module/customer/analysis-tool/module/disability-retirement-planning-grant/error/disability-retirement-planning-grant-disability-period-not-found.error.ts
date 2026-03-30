import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningGrantDisabilityPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período de deficiência da análise de concessão de aposentadoria para deficientes não encontrado',
    );
  }
}
