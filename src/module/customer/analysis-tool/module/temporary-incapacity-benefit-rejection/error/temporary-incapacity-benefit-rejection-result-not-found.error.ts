import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionResultNotFoundError.name;

  public constructor() {
    super('Resultado da análise não encontrado.');
  }
}
