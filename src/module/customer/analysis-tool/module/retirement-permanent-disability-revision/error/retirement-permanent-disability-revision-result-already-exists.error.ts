import { InvalidInputError } from '@core/error/invalid-input.error';

export class RetirementPermanentDisabilityRevisionResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionResultAlreadyExistsError.name;

  public constructor() {
    super(
      'O resultado da revisão de aposentadoria por invalidez permanente já existe.',
    );
  }
}
