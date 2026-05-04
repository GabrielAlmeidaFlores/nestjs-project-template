import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsNotFoundError.name;

  public constructor() {
    super('Vínculos não encontrados.');
  }
}
