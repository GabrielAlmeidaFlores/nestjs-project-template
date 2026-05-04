import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityTerminationResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityTerminationResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de BPC Pessoa com Deficiência cessado não encontrado.',
    );
  }
}
