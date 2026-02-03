import { InvalidInputError } from '@core/error/invalid-input.error';

export class AdministrativeRequestGeneratorDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    AdministrativeRequestGeneratorDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise do gerador de requerimento administrativo não contém uma análise simplificada.',
    );
  }
}
