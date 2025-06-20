import type { CreateBankCustomerInputModel } from '@infra/bank/model/input/create-bank-customer.input.model';
import type { CreateBankPaymentPlanInputModel } from '@infra/bank/model/input/create-bank-payment-plan.input.model';
import type { CreateBankPaymentInputModel } from '@infra/bank/model/input/create-bank-payment.input.model';
import type { CreateBankCustomerOutputModel } from '@infra/bank/model/output/create-bank-customer.output.model';
import type { CreateBankPaymentPlanOutputModel } from '@infra/bank/model/output/create-bank-payment-plan.output.model';
import type { CreateBankPaymentOutputModel } from '@infra/bank/model/output/create-bank-payment.output.model';

export abstract class BankGateway {
  public abstract createCustomer(
    props: CreateBankCustomerInputModel,
  ): Promise<CreateBankCustomerOutputModel>;
  public abstract createPayment(
    props: CreateBankPaymentInputModel,
  ): Promise<CreateBankPaymentOutputModel>;
  public abstract createPaymentPlan(
    props: CreateBankPaymentPlanInputModel,
  ): Promise<CreateBankPaymentPlanOutputModel>;
}
