import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpeechGeneratorDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    SpeechGeneratorDocumentRequiredError.name;

  public constructor() {
    super('Documentos previdenciários são obrigatórios para gerar o discurso.');
  }
}
