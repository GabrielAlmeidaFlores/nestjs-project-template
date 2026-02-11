import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpeechGeneratorResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    SpeechGeneratorResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado do gerador de discurso já existe');
  }
}
