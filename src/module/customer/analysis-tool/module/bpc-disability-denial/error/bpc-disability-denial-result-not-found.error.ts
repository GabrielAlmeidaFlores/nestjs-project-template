import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityDenialResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityDenialResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de indeferimento de BPC Pessoa com Deficiência não encontrado.',
    );
  }
}
