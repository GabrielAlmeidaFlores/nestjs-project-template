import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementDenialDocumentInvalidError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialDocumentInvalidError.name;

  public constructor() {
    super('Documento da análise de indeferimento inválido.');
  }
}
