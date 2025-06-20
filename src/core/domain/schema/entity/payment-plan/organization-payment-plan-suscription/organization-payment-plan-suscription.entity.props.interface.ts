import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface OrganizationPaymentPlanSubscriptionEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankPayment: RelationModel<BankPaymentEntity>;
  organizationPaymentPlan: OrganizationPaymentPlanEntity;
}
