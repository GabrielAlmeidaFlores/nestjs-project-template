import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityTerminationDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityTerminationDocumentRequiredError.name;

  public constructor() {
    super(
      'É necessário enviar ao menos um documento para a análise de BPC Pessoa com Deficiência cessado.',
    );
  }
}
