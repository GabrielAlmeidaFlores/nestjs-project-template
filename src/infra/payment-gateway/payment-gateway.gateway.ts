import type { CreateBillingInputModel } from '@infra/payment-gateway/model/input/create-billing.input.model';
import type { CreateCustomerInputModel } from '@infra/payment-gateway/model/input/create-customer.input.model';
import type { CreateSubscriptionInputModel } from '@infra/payment-gateway/model/input/create-subscription.input.model';
import type { CreateTransferInputModel } from '@infra/payment-gateway/model/input/create-transfer.input.model';
import type { PayBillingInputModel } from '@infra/payment-gateway/model/input/pay-billing.input.model';
import type { CreateBillingOutputModel } from '@infra/payment-gateway/model/output/create-billing.output.model';
import type { CreateCustomerOutputModel } from '@infra/payment-gateway/model/output/create-customer.output.model';
import type { CreateSubscriptionOutputModel } from '@infra/payment-gateway/model/output/create-subscription.output.model';
import type { CreateTransferOutputModel } from '@infra/payment-gateway/model/output/create-transfer.output.model';
import type { PayBillingOutputModel } from '@infra/payment-gateway/model/output/pay-billing.output.model';

export abstract class PaymentGateway {
  public abstract createSubscription(
    props: CreateSubscriptionInputModel,
  ): Promise<CreateSubscriptionOutputModel>;

  public abstract cancelSubscription(subscriptionId: string): Promise<void>;

  public abstract createBilling(
    props: CreateBillingInputModel,
  ): Promise<CreateBillingOutputModel>;

  public abstract payBilling(
    props: PayBillingInputModel,
  ): Promise<PayBillingOutputModel>;

  public abstract createCustomer(
    props: CreateCustomerInputModel,
  ): Promise<CreateCustomerOutputModel>;

  public abstract cancelBilling(billingId: string): Promise<void>;

  public abstract transfer(
    props: CreateTransferInputModel,
  ): Promise<CreateTransferOutputModel>;
}
