import { InvalidInputError } from '@core/error/invalid-input.error';

export class AdministrativeProcedureInssAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    AdministrativeProcedureInssAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise de procedimento administrativo do INSS não contém uma análise simplificada.',
    );
  }
}
