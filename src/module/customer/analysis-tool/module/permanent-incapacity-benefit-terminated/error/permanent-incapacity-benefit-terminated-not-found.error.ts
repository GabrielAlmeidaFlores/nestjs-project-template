import { NotFoundError } from '@core/error/not-found.error';

export class PermanentIncapacityBenefitTerminatedNotFoundError extends NotFoundError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedNotFoundError.name;

  public constructor() {
    super(
      'Análise de cessação de aposentadoria por incapacidade permanente não encontrada.',
    );
  }
}
