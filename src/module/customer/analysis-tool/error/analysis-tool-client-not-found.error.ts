import { NotFoundError } from '@core/error/not-found.error';

export class AnalysisToolClientNotFoundError extends NotFoundError {
  protected override readonly _type = AnalysisToolClientNotFoundError.name;

  public constructor() {
    super('Cliente não encontrado');
  }
}
