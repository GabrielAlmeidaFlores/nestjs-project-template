import type { AffiliateCustomerEntity } from '@core/domain/schema/entity/affiliate/affiliate-customer/affiliate-customer.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PaymentPlanEntityPropsInterface } from '@core/domain/schema/entity/payment-plan/payment-plan/payment-plan.entity.props.interface';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export interface AffiliateCustomerEnabledPaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface {
  affiliateCustomer: AffiliateCustomerEntity;
  paymentPlan: RelationType<PaymentPlanEntityPropsInterface>;
}
