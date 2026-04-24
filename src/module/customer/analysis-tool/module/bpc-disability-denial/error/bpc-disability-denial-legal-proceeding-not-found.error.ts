import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityDenialLegalProceedingNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityDenialLegalProceedingNotFoundError.name;

  public constructor() {
    super(
      'Processo judicial da análise de indeferimento de BPC Pessoa com Deficiência não encontrado.',
    );
  }
}
