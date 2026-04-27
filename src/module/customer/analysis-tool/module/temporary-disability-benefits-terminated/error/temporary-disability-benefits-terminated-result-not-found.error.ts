import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsTerminatedResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedResultNotFoundError.name;

  public constructor() {
    super('Resultado da análise não encontrado.');
  }
}
