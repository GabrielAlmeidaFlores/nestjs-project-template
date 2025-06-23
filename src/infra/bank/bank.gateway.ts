import type { CreateBankChargeInputModel } from '@infra/bank/model/input/create-bank-charge.input.model';
import type { CreateBankCustomerInputModel } from '@infra/bank/model/input/create-bank-customer.input.model';
import type { CreateBankPaymentPlanInputModel } from '@infra/bank/model/input/create-bank-payment-plan.input.model';
import type { PayBankChargeInputModel } from '@infra/bank/model/input/pay-bank-charge.input.model';
import type { CreateBankChargeOutputModel } from '@infra/bank/model/output/create-bank-charge.output.model';
import type { CreateBankCustomerOutputModel } from '@infra/bank/model/output/create-bank-customer.output.model';
import type { CreateBankPaymentPlanOutputModel } from '@infra/bank/model/output/create-bank-payment-plan.output.model';

export abstract class BankGateway {
  public abstract createCustomer(
    props: CreateBankCustomerInputModel,
  ): Promise<CreateBankCustomerOutputModel>;
  public abstract createBankPaymentPlan(
    props: CreateBankPaymentPlanInputModel,
  ): Promise<CreateBankPaymentPlanOutputModel>;
  public abstract createCharge(
    props: CreateBankChargeInputModel,
  ): Promise<CreateBankChargeOutputModel>;
  public abstract payCharge(props: PayBankChargeInputModel): Promise<void>;
}
