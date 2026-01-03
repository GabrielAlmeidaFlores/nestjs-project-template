import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPlanningRgpsTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPlanningRgpsTimeAcceleratorNotFoundError.name;

  public constructor() {
    super('Acelerador de tempo não encontrado');
  }
}
