import { InvalidInputError } from '@core/error/invalid-input.error';

export class AudienceQuestionDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    AudienceQuestionDocumentRequiredError.name;

  public constructor() {
    super('É necessário fornecer ao menos um documento para gerar perguntas');
  }
}
