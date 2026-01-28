import { InvalidInputError } from '@core/error/invalid-input.error';

export class DownloadMedicalAndSocialReportObjectionGeneratorAnalysisIsNotValidError extends InvalidInputError {
  protected override readonly _type =
    DownloadMedicalAndSocialReportObjectionGeneratorAnalysisIsNotValidError.name;

  public constructor() {
    super('Formato de documento para download inválido');
  }
}
