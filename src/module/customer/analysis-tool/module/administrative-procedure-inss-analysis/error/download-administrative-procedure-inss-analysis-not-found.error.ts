import { InvalidInputError } from '@core/error/invalid-input.error';

export class DownloadAdministrativeProcedureInssAnalysisIsNotValidError extends InvalidInputError {
  protected override readonly _type =
    DownloadAdministrativeProcedureInssAnalysisIsNotValidError.name;

  public constructor() {
    super('Formato de documento para download inválido');
  }
}
