import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpeechGeneratorDoesNotContainSimplifiedContentError extends InvalidInputError {
  protected override readonly _type =
    SpeechGeneratorDoesNotContainSimplifiedContentError.name;

  public constructor() {
    super(
      'O gerador de discurso não contém conteúdo simplificado para download.',
    );
  }
}
