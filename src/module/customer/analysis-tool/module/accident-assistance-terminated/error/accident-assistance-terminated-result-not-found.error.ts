import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceTerminatedResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceTerminatedResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado do diagnóstico para auxílio-acidente (RGPS) não encontrado. Por favor, gere o diagnóstico primeiro.',
    );
  }
}
