import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsTerminatedNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedNotFoundError.name;

  public constructor() {
    super(
      'Análise de indeferimento de auxílio por incapacidade temporária não encontrada.',
    );
  }
}
