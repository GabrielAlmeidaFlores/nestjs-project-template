import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityGrantAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityGrantAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super(
      'Ã‰ necessÃ¡rio anexar o processo administrativo com o indeferimento do INSS antes de gerar a anÃ¡lise da decisÃ£o.',
    );
  }
}
