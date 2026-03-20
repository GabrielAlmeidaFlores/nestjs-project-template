import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningRemunerationCalculationNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningRemunerationCalculationNotFoundError.name;

  public constructor() {
    super(
      'Remuneração do planejamento de aposentadoria da pessoa com deficiência não encontrada',
    );
  }
}
