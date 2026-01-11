import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPlanningRgpsResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPlanningRgpsResultNotFoundError.name;

  public constructor() {
    super('Resultado do planejamento RGPS não encontrado');
  }
}
