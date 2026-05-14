import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidBpcDisabilityGrantResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidBpcDisabilityGrantResultJsonError.name;

  public constructor() {
    super(
      'O resultado retornado para a anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia estÃ¡ em formato invÃ¡lido.',
    );
  }
}
