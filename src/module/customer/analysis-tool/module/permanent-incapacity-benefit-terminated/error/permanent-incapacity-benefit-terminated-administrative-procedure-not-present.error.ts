import { InvalidInputError } from '@core/error/invalid-input.error';

export class PermanentIncapacityBenefitTerminatedAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super('O documento do processo administrativo é obrigatório.');
  }
}
