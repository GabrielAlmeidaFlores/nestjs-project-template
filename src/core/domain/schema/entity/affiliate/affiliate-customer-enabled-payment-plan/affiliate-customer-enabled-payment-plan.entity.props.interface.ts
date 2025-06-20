import type { AffiliateCustomerEntity } from '@core/domain/schema/entity/affiliate/affiliate-customer/affiliate-customer.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/available-payment-plan/available-payment-plan.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface AffiliateCustomerEnabledPaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface {
  affiliateCustomer: AffiliateCustomerEntity;
  availablePaymentPlan: RelationModel<AvailablePaymentPlanEntity>;
}
