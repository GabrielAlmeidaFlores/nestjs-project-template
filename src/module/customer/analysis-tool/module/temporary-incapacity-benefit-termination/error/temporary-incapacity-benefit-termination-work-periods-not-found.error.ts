import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitTerminationWorkPeriodsNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsNotFoundError.name;

  public constructor() {
    super('Vínculos não encontrados.');
  }
}
