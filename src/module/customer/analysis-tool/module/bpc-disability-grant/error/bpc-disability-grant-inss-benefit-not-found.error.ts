import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityGrantInssBenefitNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityGrantInssBenefitNotFoundError.name;

  public constructor() {
    super(
      'BenefÃ­cio INSS da anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia nÃ£o encontrado.',
    );
  }
}
