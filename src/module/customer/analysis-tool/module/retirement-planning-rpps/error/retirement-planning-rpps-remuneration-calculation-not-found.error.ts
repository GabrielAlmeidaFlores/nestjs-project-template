import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPlanningRppsRemunerationCalculationNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPlanningRppsRemunerationCalculationNotFoundError.name;

  public constructor() {
    super('Remuneração do planejamento previdenciário RPPS não encontrada');
  }
}
