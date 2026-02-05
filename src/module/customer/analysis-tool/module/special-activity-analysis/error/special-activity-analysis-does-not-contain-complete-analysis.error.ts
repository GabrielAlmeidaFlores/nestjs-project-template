import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialActivityAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    SpecialActivityAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A atividade especial não contém análise completa disponível para download.',
    );
  }
}
