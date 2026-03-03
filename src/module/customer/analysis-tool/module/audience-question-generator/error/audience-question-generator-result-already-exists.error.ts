import { InvalidInputError } from '@core/error/invalid-input.error';

export class AudienceQuestionGeneratorResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    AudienceQuestionGeneratorResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado já existe para este gerador de perguntas para audiência');
  }
}
