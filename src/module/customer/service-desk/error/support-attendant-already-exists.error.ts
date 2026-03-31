import { ConflictError } from '@core/error/conflict.error';

export class SupportAttendantAlreadyExistsError extends ConflictError {
  protected override readonly _type = SupportAttendantAlreadyExistsError.name;

  public constructor() {
    super(
      'Já existe um convite ou atendente cadastrado com este e-mail nesta organização.',
    );
  }
}
