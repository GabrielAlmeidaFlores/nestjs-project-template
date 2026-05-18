import { InvalidInputError } from '@core/error/invalid-input.error';

export class ElderlyBpcRejectionAdministrativeProceedingsNotPresentError extends InvalidInputError {
  protected override readonly _type =
    ElderlyBpcRejectionAdministrativeProceedingsNotPresentError.name;

  public constructor() {
    super(
      'E necessario anexar o processo administrativo do INSS antes de gerar a analise da decisao.',
    );
  }
}
