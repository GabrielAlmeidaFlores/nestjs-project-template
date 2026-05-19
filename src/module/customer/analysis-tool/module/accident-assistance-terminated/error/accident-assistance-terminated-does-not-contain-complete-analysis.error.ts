import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceTerminatedDoesNotContainCompleteAnalysisError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceTerminatedDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'O diagnóstico para auxílio-acidente (RGPS) não contém análise completa',
    );
  }
}
