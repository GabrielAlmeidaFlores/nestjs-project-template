import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionResultNotFoundError.name;

  public constructor() {
    super(
      'O resultado da análise de indeferimento por incapacidade permanente não foi encontrado.',
    );
  }
}
