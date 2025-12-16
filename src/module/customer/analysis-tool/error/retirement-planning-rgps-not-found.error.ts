import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPlanningRgpsNotFoundError extends NotFoundError {
  protected override readonly _type = RetirementPlanningRgpsNotFoundError.name;

  public constructor() {
    super('Planejamento de RGPS não encontrado');
  }
}
