import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityTerminationInssBenefitNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityTerminationInssBenefitNotFoundError.name;

  public constructor() {
    super(
      'Benefício INSS da análise de BPC Pessoa com Deficiência cessado não encontrado.',
    );
  }
}
