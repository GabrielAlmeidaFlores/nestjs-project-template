import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceTerminatedDoesNotContainSimplifiedAnalysisError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceTerminatedDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'O diagnóstico para auxílio-acidente (RGPS) não contém análise simplificada',
    );
  }
}
