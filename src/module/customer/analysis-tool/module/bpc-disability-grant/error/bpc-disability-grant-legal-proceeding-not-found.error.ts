import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityGrantLegalProceedingNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityGrantLegalProceedingNotFoundError.name;

  public constructor() {
    super(
      'Processo judicial da anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia nÃ£o encontrado.',
    );
  }
}
