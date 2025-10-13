import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAnalysisToolRecordCodeError extends InvalidInputError {
  protected override readonly _type = InvalidAnalysisToolRecordCodeError.name;

  public constructor() {
    super(
      'O código do registro da ferramenta de análise informado não é válido',
    );
  }
}
