import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialActivityDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    SpecialActivityDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A atividade especial não contém análise completa disponível para download.',
    );
  }
}
