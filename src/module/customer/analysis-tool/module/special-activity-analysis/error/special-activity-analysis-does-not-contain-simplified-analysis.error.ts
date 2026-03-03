import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialActivityAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    SpecialActivityAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A atividade especial não contém análise simplificada disponível para download.',
    );
  }
}
