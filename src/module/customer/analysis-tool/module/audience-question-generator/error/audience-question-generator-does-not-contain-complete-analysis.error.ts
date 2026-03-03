import { InvalidInputError } from '@core/error/invalid-input.error';

export class AudienceQuestionGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    AudienceQuestionGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('O gerador de perguntas para audiência não contém análise completa');
  }
}
