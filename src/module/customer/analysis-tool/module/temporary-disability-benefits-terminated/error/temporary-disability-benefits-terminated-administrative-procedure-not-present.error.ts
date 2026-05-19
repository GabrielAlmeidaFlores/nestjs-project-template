import { InvalidInputError } from '@core/error/invalid-input.error';

export class TemporaryDisabilityBenefitsTerminatedAdministrativeProcedureNotPresentError extends InvalidInputError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedAdministrativeProcedureNotPresentError.name;

  public constructor() {
    super('O documento do processo administrativo indeferido é obrigatório.');
  }
}
