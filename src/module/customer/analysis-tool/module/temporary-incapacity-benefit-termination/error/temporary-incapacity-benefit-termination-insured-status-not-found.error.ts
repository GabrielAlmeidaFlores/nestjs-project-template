import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitTerminationInsuredStatusNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusNotFoundError.name;

  public constructor() {
    super('Qualidade de segurado não encontrada.');
  }
}
