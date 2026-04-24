import { NotFoundError } from '@core/error/not-found.error';

export class BpcElderlyCessationInssBenefitNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcElderlyCessationInssBenefitNotFoundError.name;

  public constructor() {
    super(
      'Benefício INSS da análise de cessação de BPC ao Idoso não encontrado.',
    );
  }
}
