import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitRejectionTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitRejectionTimeAcceleratorNotFoundError.name;

  public constructor() {
    super('Acelerador de tempo da análise de pensão por morte não encontrado.');
  }
}
