import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidSupportTicketNumberError extends InvalidInputError {
  protected override readonly _type = InvalidSupportTicketNumberError.name;

  public constructor() {
    super('O número do ticket de suporte informado não é válido');
  }
}
