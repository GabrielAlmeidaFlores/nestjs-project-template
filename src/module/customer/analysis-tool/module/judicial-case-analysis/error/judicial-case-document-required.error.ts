import { InvalidInputError } from '@core/error/invalid-input.error';

export class JudicialCaseDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    JudicialCaseDocumentRequiredError.name;

  public constructor() {
    super(
      'O upload do documento do caso judicial é obrigatório para solicitar a análise',
    );
  }
}

