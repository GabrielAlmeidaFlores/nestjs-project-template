import { InvalidInputError } from '@core/error/invalid-input.error';

export class SupportTicketInvalidStatusError extends InvalidInputError {
  protected override readonly _type = SupportTicketInvalidStatusError.name;

  public constructor() {
    super(
      'Operação inválida para o status atual do chamado. Verifique o status antes de tentar novamente.',
    );
  }
}
