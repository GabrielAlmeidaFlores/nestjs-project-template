import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityGrantDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityGrantDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia nÃ£o contÃ©m anÃ¡lise completa.',
    );
  }
}
