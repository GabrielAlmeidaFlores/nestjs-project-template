import { NotFoundError } from '@core/error/not-found.error';

export class DownloadMedicalQuestionGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    DownloadMedicalQuestionGeneratorNotFoundError.name;

  public constructor() {
    super('Download do gerador de perguntas médicas não encontrado.');
  }
}
