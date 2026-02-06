import { InvalidInputError } from '@core/error/invalid-input.error';

export class MedicalQuestionGeneratorDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    MedicalQuestionGeneratorDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super('O gerador de perguntas médicas não contém análise simplificada.');
  }
}
