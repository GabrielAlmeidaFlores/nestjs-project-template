import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidGeneralUrbanRetirementDenialResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidGeneralUrbanRetirementDenialResultJsonError.name;

  public constructor() {
    super(
      'O resultado da análise de indeferimento de aposentadoria urbana comum retornado pela IA está em formato inválido.',
    );
  }
}
