import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAccidentAssistanceTerminatedFirstAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidAccidentAssistanceTerminatedFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da primeira análise do auxílio-acidente (RGPS) é inválido ou não pôde ser interpretado.',
    );
  }
}
