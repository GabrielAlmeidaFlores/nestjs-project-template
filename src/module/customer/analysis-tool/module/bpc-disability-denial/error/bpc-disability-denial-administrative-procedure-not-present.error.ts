import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityDenialAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityDenialAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super(
      'É necessário anexar o processo administrativo com o indeferimento do INSS antes de gerar a análise da decisão.',
    );
  }
}
