import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantInsuredStatusNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusNotFoundError.name;

  public constructor() {
    super(
      'Qualidade de segurado da análise de concessão de benefício por incapacidade temporária não encontrada.',
    );
  }
}
