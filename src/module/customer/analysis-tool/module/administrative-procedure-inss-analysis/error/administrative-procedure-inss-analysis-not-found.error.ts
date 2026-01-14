import { NotFoundError } from '@core/error/not-found.error';

export class AdministrativeProcedureInssAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    AdministrativeProcedureInssAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de procedimento administrativo do INSS não encontrada');
  }
}
