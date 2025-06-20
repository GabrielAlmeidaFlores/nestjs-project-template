import type { CreateBankCustomerInputModel } from '@infra/bank/model/input/create-bank-customer.input.model';
import type { CreateBankPaymentInputModel } from '@infra/bank/model/input/create-bank-payment.input.model';

export abstract class BankGateway {
  public abstract createCustomer(
    props: CreateBankCustomerInputModel,
  ): Promise<void>;
  public abstract createPayment(
    props: CreateBankPaymentInputModel,
  ): Promise<void>;
}
