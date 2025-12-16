import type { CreateCustomerInputModel } from '@infra/payment-gateway/model/input/create-customer.input.model';
import type { CreateSubscriptionInputModel } from '@infra/payment-gateway/model/input/create-subscription.input.model';
import type { CreateCustomerOutputModel } from '@infra/payment-gateway/model/output/create-customer.output.model';
import type { CreateSubscriptionOutputModel } from '@infra/payment-gateway/model/output/create-subscription.output.model';

export abstract class PaymentGateway {
  public abstract createSubscription(
    props: CreateSubscriptionInputModel,
  ): Promise<CreateSubscriptionOutputModel>;

  public abstract createCustomer(
    props: CreateCustomerInputModel,
  ): Promise<CreateCustomerOutputModel>;
}
