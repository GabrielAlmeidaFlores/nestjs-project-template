import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceTerminatedPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceTerminatedPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período do diagnóstico para auxílio-acidente (RGPS) não encontrado.',
    );
  }
}
