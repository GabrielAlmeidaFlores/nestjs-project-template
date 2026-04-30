import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceTerminatedNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceTerminatedNotFoundError.name;

  public constructor() {
    super('Diagnóstico para auxílio-acidente (RGPS) não encontrado');
  }
}
