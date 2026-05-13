import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityGrantDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityGrantDocumentRequiredError.name;

  public constructor() {
    super(
      'Ã‰ necessÃ¡rio enviar ao menos um documento para a anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia.',
    );
  }
}
