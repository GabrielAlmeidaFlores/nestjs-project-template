import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPlanningRgpsPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPlanningRgpsPeriodNotFoundError.name;

  public constructor() {
    super('Período do planejamento de RGPS não encontrado');
  }
}
