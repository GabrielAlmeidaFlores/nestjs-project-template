import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantWorkPeriodsNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsNotFoundError.name;

  public constructor() {
    super(
      'Vínculo da análise de concessão de benefício por incapacidade temporária não encontrado.',
    );
  }
}
