import { NotFoundError } from '@core/error/not-found.error';

export class RegulatoryUpdateMonitoredSourceNotFoundError extends NotFoundError {
  protected override readonly _type =
    RegulatoryUpdateMonitoredSourceNotFoundError.name;

  public constructor() {
    super('Fonte monitorada não encontrada.');
  }
}
