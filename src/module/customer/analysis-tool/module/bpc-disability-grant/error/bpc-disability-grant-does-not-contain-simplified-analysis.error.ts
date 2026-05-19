import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityGrantDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityGrantDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia nÃ£o contÃ©m anÃ¡lise simplificada.',
    );
  }
}
