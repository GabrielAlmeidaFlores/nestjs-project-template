import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPlanningRgpsSpecialPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPlanningRgpsSpecialPeriodNotFoundError.name;

  public constructor() {
    super('Período especial RGPS não encontrado');
  }
}
