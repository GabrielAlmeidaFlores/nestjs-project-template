import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityDenialNotFoundError extends NotFoundError {
  protected override readonly _type = BpcDisabilityDenialNotFoundError.name;

  public constructor() {
    super(
      'Análise de indeferimento de BPC Pessoa com Deficiência não encontrada.',
    );
  }
}
