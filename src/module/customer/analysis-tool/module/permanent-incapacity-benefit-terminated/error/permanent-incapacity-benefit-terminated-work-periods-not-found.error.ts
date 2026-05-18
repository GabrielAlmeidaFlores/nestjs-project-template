import { NotFoundError } from '@core/error/not-found.error';

export class PermanentIncapacityBenefitTerminatedWorkPeriodsNotFoundError extends NotFoundError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsNotFoundError.name;

  public constructor() {
    super('Vínculos não encontrados.');
  }
}
