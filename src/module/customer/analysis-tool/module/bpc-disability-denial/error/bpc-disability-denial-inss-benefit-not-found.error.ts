import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityDenialInssBenefitNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityDenialInssBenefitNotFoundError.name;

  public constructor() {
    super(
      'Benefício INSS da análise de indeferimento de BPC Pessoa com Deficiência não encontrado.',
    );
  }
}
