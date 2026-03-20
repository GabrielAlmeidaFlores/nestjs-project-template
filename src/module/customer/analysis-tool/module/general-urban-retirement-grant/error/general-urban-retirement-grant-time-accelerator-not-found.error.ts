import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementGrantTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementGrantTimeAcceleratorNotFoundError.name;

  public constructor() {
    super('Acelerador de tempo da concessão urbana geral não encontrado');
  }
}
