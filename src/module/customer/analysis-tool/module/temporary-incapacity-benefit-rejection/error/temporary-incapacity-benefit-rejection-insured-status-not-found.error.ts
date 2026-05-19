import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitRejectionInsuredStatusNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusNotFoundError.name;

  public constructor() {
    super('Qualidade de segurado não encontrada.');
  }
}
