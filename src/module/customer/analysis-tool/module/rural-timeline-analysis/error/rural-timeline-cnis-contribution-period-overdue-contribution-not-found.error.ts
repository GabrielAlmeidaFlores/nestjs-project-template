import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineCnisContributionPeriodOverdueContributionNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineCnisContributionPeriodOverdueContributionNotFoundError.name;

  public constructor() {
    super(
      'Contribuição em atraso não encontrada. Por favor, verifique o ID informado.',
    );
  }
}
