import { ConflictError } from '@core/error/conflict.error';

export class SupportTicketAlreadyAssignedError extends ConflictError {
  protected override readonly _type = SupportTicketAlreadyAssignedError.name;

  public constructor() {
    super(
      'Este chamado já possui um atendente responsável.',
    );
  }
}
