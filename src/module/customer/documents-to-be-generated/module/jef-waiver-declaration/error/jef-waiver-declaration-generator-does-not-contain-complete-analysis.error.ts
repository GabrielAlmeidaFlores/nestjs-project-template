import { InvalidInputError } from '@core/error/invalid-input.error';

export class JefWaiverDeclarationGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type = JefWaiverDeclarationGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise do gerador de declaração de renúncia ao excedente do JEF não contém uma análise completa.');
  }
}
