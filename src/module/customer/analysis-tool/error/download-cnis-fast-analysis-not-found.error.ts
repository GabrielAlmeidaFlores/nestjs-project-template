import { InvalidInputError } from '@core/error/invalid-input.error';

export class DownloadCnisFastAnalysisIsNotValidError extends InvalidInputError {
  protected override readonly _type =
    DownloadCnisFastAnalysisIsNotValidError.name;

  public constructor() {
    super('Formato de documento para download inválido');
  }
}
