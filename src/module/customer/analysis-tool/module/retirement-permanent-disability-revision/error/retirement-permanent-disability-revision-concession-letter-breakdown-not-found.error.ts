import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRevisionConcessionLetterBreakdownNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownNotFoundError.name;

  public constructor() {
    super('Item do detalhamento da carta de concessão não encontrado.');
  }
}
