import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitRejectionNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionNotFoundError.name;

  public constructor() {
    super(
      'Análise de indeferimento de auxílio por incapacidade temporária não encontrada.',
    );
  }
}
