import { NotFoundError } from '@core/error/not-found.error';

export class BpcElderlyCessationLegalProceedingNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcElderlyCessationLegalProceedingNotFoundError.name;

  public constructor() {
    super(
      'Processo judicial da análise de cessação de BPC ao Idoso não encontrado.',
    );
  }
}
