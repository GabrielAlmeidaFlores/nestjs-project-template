import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementDenialCnisNotPresentError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialCnisNotPresentError.name;

  public constructor() {
    super('Documento CNIS da análise de indeferimento não informado.');
  }
}
