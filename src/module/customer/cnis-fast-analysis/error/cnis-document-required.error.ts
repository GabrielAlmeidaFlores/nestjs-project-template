import { InvalidInputError } from '@core/error/invalid-input.error';

export class CnisDocumentRequiredError extends InvalidInputError {
  protected override readonly _type = CnisDocumentRequiredError.name;

  public constructor() {
    super('O upload do documento CNIS é obrigatório para solicitar a análise');
  }
}
