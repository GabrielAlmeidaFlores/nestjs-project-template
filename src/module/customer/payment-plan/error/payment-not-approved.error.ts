import { InvalidInputError } from '@core/error/invalid-input.error';

export class PaymentNotApprovedError extends InvalidInputError {
  protected override readonly _type = PaymentNotApprovedError.name;

  public constructor() {
    super('O pagamento não foi aprovado e não pôde ser concluído.');
  }
}
