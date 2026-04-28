import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityTerminationLegalProceedingNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityTerminationLegalProceedingNotFoundError.name;

  public constructor() {
    super(
      'Processo judicial da análise de BPC Pessoa com Deficiência cessado não encontrado.',
    );
  }
}
