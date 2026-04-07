import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de concessão de benefício por incapacidade temporária não encontrado.',
    );
  }
}
