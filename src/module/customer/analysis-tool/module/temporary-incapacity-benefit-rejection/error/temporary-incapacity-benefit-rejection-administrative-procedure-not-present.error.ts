import { InvalidInputError } from '@core/error/invalid-input.error';

export class TemporaryIncapacityBenefitRejectionAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super('O documento do processo administrativo indeferido é obrigatório.');
  }
}
