import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityTerminationResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityTerminationResultAlreadyExistsError.name;

  public constructor() {
    super(
      'Resultado da análise de BPC Pessoa com Deficiência cessado já existe.',
    );
  }
}
