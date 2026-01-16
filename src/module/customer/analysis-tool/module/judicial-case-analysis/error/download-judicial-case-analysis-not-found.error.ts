import { InvalidInputError } from '@core/error/invalid-input.error';

export class DownloadJudicialCaseAnalysisIsNotValidError extends InvalidInputError {
  protected override readonly _type =
    DownloadJudicialCaseAnalysisIsNotValidError.name;

  public constructor() {
    super('Formato de documento para download inválido');
  }
}
