import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialActivityDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    SpecialActivityDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A atividade especial não contém análise simplificada disponível para download.',
    );
  }
}
