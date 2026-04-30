import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyCessationAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyCessationAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super(
      'É necessário anexar o processo administrativo ou decisão de cessação/suspensão do INSS antes de gerar a análise da decisão.',
    );
  }
}
