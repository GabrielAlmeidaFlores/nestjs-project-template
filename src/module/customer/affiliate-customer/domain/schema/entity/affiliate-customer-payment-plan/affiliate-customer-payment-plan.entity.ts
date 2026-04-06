import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AffiliateCustomerPaymentPlanEntityPropsInterface } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/affiliate-customer-payment-plan.entity.props.interface';
import { AffiliateCustomerPaymentPlanId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/value-object/affiliate-customer-payment-plan-id/affiliate-customer-payment-plan-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export class AffiliateCustomerPaymentPlanEntity extends BaseEntity<AffiliateCustomerPaymentPlanId> {
  @Description('Identificador do afiliado')
  public readonly affiliateCustomer: AffiliateCustomerId;

  @Description('Identificador do plano de pagamento elegível ao desconto')
  public readonly paymentPlan: PaymentPlanId;

  protected readonly _type = AffiliateCustomerPaymentPlanEntity.name;

  public constructor(props: AffiliateCustomerPaymentPlanEntityPropsInterface) {
    super(AffiliateCustomerPaymentPlanId, props);

    this.affiliateCustomer = props.affiliateCustomer;
    this.paymentPlan = props.paymentPlan;
  }
}
