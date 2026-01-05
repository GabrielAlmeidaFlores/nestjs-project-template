import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPlanningRppsNotFoundError extends NotFoundError {
  protected override readonly _type = RetirementPlanningRppsNotFoundError.name;

  public constructor() {
    super('Planejamento previdenciário RPPS não encontrado');
  }
}
