import { InvalidInputError } from '@core/error/invalid-input.error';

export class AdministrativeProcedureInssAnalysisResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    AdministrativeProcedureInssAnalysisResultAlreadyExistsError.name;

  public constructor() {
    super(
      'Resultado da análise de procedimento administrativo do INSS já existe',
    );
  }
}
