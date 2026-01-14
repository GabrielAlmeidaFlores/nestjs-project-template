import { InvalidInputError } from '@core/error/invalid-input.error';

export class AdministrativeProcedureDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    AdministrativeProcedureDocumentRequiredError.name;

  public constructor() {
    super(
      'O upload do documento do procedimento administrativo é obrigatório para solicitar a análise',
    );
  }
}
