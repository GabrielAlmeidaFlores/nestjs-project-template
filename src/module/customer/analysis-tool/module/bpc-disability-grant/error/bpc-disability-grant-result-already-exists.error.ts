import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityGrantResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityGrantResultAlreadyExistsError.name;

  public constructor() {
    super(
      'Resultado da anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia jÃ¡ existe.',
    );
  }
}
