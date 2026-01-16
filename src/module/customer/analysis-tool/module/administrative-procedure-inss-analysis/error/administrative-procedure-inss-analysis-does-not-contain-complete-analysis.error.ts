import { InvalidInputError } from '@core/error/invalid-input.error';

export class AdministrativeProcedureInssAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    AdministrativeProcedureInssAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise de procedimento administrativo do INSS não contém uma análise completa.',
    );
  }
}
