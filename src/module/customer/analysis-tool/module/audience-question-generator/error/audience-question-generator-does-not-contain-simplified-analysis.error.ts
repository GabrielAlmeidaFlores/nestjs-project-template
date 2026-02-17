import { InvalidInputError } from '@core/error/invalid-input.error';

export class AudienceQuestionGeneratorDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    AudienceQuestionGeneratorDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'O gerador de perguntas para audiência não contém análise simplificada',
    );
  }
}
