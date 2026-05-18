import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityTerminationNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityTerminationNotFoundError.name;

  public constructor() {
    super('Análise de BPC Pessoa com Deficiência cessado não encontrada.');
  }
}
