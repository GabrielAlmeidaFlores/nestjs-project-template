import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { PaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/payment-plan/payment-plan.entity';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan-cycle.enum';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface OrganizationPaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface {
  name: string;
  description: string;
  price: number;
  maxMemberLimit: number;
  monthlyCreditAmount: number;
  cycle: PaymentPlanCycleEnum;
  paymentPlan: RelationModel<PaymentPlanEntity>;
  organization: RelationModel<OrganizationEntity>;
}
