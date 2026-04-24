import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityDenialDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityDenialDocumentRequiredError.name;

  public constructor() {
    super(
      'É necessário enviar ao menos um documento para a análise de indeferimento de BPC Pessoa com Deficiência.',
    );
  }
}
