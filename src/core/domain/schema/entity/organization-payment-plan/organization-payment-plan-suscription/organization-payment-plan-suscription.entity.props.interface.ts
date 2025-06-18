import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export interface OrganizationPaymentPlanSubscriptionEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankPayment: RelationType<BankPaymentEntity>;
  organizationPaymentPlan: OrganizationPaymentPlanEntity;
}
