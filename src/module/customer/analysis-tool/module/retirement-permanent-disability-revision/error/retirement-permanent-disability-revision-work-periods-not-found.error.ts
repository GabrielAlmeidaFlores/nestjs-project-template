import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRevisionWorkPeriodsNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsNotFoundError.name;

  public constructor() {
    super(
      'Período da revisão de aposentadoria por invalidez permanente não encontrado.',
    );
  }
}
