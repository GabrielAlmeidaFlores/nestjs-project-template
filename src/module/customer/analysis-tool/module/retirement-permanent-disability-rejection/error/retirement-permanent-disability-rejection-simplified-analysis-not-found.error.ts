import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRejectionSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'A análise simplificada de indeferimento por incapacidade permanente não foi encontrada.',
    );
  }
}
