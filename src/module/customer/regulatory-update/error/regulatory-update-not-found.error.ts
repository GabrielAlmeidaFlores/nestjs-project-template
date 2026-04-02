import { NotFoundError } from '@core/error/not-found.error';

export class RegulatoryUpdateNotFoundError extends NotFoundError {
  protected override readonly _type = RegulatoryUpdateNotFoundError.name;

  public constructor() {
    super('Atualização normativa não encontrada.');
  }
}
