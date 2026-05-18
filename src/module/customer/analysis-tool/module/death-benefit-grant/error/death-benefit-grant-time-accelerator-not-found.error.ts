import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitGrantTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitGrantTimeAcceleratorNotFoundError.name;

  public constructor() {
    super('Acelerador de tempo da análise de pensão por morte não encontrado.');
  }
}
