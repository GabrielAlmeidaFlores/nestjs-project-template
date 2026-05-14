import { NotFoundError } from '@core/error/not-found.error';

export class PermanentIncapacityBenefitTerminatedInsuredStatusNotFoundError extends NotFoundError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusNotFoundError.name;

  public constructor() {
    super('Qualidade de segurado não encontrada.');
  }
}
