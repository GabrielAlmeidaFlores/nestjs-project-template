import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpeechGeneratorDoesNotContainCompleteContentError extends InvalidInputError {
  protected override readonly _type =
    SpeechGeneratorDoesNotContainCompleteContentError.name;

  public constructor() {
    super('O gerador de discurso não contém conteúdo completo para download.');
  }
}
