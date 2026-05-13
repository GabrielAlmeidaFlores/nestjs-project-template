import { InvalidInputError } from '@core/error/invalid-input.error';

export class RetirementPermanentDisabilityRevisionDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A revisão de aposentadoria por invalidez permanente não contém uma análise completa.',
    );
  }
}
