import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitRejectionWorkPeriodsNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsNotFoundError.name;

  public constructor() {
    super('Vínculos não encontrados.');
  }
}
