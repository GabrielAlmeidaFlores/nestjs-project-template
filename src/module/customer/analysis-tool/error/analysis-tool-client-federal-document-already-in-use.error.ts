import { InvalidInputError } from '@core/error/invalid-input.error';

export class AnalysisToolClientFederalDocumentAlreadyInUseError extends InvalidInputError {
  protected override readonly _type =
    AnalysisToolClientFederalDocumentAlreadyInUseError.name;

  public constructor() {
    super('O documento do cliente já está em uso');
  }
}
