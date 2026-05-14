import { InvalidInputError } from '@core/error/invalid-input.error';

export class RetirementPermanentDisabilityRevisionDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A revisão de aposentadoria por invalidez permanente não contém uma análise simplificada.',
    );
  }
}
