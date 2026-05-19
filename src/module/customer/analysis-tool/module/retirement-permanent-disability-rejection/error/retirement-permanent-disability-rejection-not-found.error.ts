import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRejectionNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionNotFoundError.name;

  public constructor() {
    super(
      'Análise de indeferimento de aposentadoria por incapacidade permanente não encontrada.',
    );
  }
}
