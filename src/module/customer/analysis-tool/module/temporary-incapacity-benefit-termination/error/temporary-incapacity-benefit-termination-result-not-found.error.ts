import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitTerminationResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationResultNotFoundError.name;

  public constructor() {
    super('Resultado da análise não encontrado.');
  }
}
