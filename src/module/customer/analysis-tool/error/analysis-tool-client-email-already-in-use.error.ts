import { InvalidInputError } from '@core/error/invalid-input.error';

export class AnalysisToolClientEmailAlreadyInUseError extends InvalidInputError {
  protected override readonly _type =
    AnalysisToolClientEmailAlreadyInUseError.name;

  public constructor() {
    super('O email do cliente já está em uso');
  }
}
