import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementReviewTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewTimeAcceleratorNotFoundError.name;

  public constructor() {
    super('Acelerador de tempo da revisão urbana geral não encontrado');
  }
}
