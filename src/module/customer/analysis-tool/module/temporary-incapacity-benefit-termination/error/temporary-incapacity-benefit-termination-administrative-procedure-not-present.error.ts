import { InvalidInputError } from '@core/error/invalid-input.error';

export class TemporaryIncapacityBenefitTerminationAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super('O documento do processo administrativo é obrigatório.');
  }
}
