import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitTerminationNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationNotFoundError.name;

  public constructor() {
    super(
      'Análise de cessação de auxílio por incapacidade temporária não encontrada.',
    );
  }
}
