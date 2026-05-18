import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantNotFoundError.name;

  public constructor() {
    super(
      'Análise de concessão de benefício por incapacidade temporária não encontrada.',
    );
  }
}
