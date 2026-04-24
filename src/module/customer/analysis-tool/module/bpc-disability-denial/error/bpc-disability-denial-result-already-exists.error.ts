import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityDenialResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityDenialResultAlreadyExistsError.name;

  public constructor() {
    super(
      'Resultado da análise de indeferimento de BPC Pessoa com Deficiência já existe.',
    );
  }
}
