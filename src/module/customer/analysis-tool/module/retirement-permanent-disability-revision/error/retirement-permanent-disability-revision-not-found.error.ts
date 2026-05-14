import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRevisionNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionNotFoundError.name;

  public constructor() {
    super('Revisão de aposentadoria por invalidez permanente não encontrada.');
  }
}
