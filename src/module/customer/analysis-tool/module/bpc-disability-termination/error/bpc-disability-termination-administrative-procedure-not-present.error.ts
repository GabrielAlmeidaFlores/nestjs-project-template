import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityTerminationAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityTerminationAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super(
      'É necessário anexar o processo administrativo com a cessação do INSS antes de gerar a análise da decisão.',
    );
  }
}
