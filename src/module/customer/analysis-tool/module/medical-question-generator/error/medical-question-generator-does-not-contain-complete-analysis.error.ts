import { InvalidInputError } from '@core/error/invalid-input.error';

export class MedicalQuestionGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    MedicalQuestionGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('O gerador de perguntas médicas não contém análise completa.');
  }
}
