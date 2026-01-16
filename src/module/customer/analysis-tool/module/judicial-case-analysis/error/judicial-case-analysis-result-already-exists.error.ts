import { InvalidInputError } from '@core/error/invalid-input.error';

export class JudicialCaseAnalysisResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    JudicialCaseAnalysisResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado da análise de caso judicial já existe');
  }
}
