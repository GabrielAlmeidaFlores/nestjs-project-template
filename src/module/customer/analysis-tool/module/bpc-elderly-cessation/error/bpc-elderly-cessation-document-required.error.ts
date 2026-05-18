import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyCessationDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyCessationDocumentRequiredError.name;

  public constructor() {
    super(
      'É necessário enviar ao menos um documento para a análise de cessação de BPC ao Idoso.',
    );
  }
}
