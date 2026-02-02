import { InvalidInputError } from '@core/error/invalid-input.error';

export class AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise do gerador de requerimento administrativo não contém uma análise completa.');
  }
}
