import { NotFoundError } from '@core/error/not-found.error';

export class PermanentIncapacityBenefitTerminatedResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedResultNotFoundError.name;

  public constructor() {
    super('Resultado da análise não encontrado.');
  }
}
