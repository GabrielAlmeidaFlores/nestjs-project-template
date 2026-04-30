import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsTerminatedInsuredStatusNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusNotFoundError.name;

  public constructor() {
    super('Qualidade de segurado não encontrada.');
  }
}
