import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceGrantNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceGrantNotFoundError.name;

  public constructor() {
    super('Análise de concessão de auxílio-acidente não encontrada.');
  }
}
