import { ConflictError } from '@core/error/conflict.error';

export class AccidentAssistanceTerminatedResultAlreadyExistsError extends ConflictError {
  protected override readonly _type =
    AccidentAssistanceTerminatedResultAlreadyExistsError.name;

  public constructor() {
    super(
      'O resultado do diagnóstico para auxílio-acidente (RGPS) já foi gerado',
    );
  }
}
