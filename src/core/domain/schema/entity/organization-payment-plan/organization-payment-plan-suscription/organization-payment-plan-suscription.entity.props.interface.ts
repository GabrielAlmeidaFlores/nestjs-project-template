import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface OrganizationPaymentPlanSubscriptionEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankPayment: Guid;
  organizationPaymentPlan: OrganizationPaymentPlanEntity;
}
