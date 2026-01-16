import { InvalidInputError } from '@core/error/invalid-input.error';

export class AdministrativeProcedureDocumentIsNotValidError extends InvalidInputError {
  protected override readonly _type =
    AdministrativeProcedureDocumentIsNotValidError.name;

  public constructor() {
    super('O documento do procedimento administrativo não é válido');
  }
}
