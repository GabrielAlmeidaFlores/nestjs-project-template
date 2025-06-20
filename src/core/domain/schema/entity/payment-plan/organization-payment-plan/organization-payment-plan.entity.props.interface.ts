import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/available-payment-plan/available-payment-plan.entity';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/entity/payment-plan/enum/payment-plan-cycle.enum';
import type { RelationModel } from '@core/domain/schema/model/relation.model';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export interface OrganizationPaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface {
  name: string;
  description: string;
  price: DecimalValue;
  maxMemberLimit: number;
  monthlyCreditAmount: number;
  cycle: PaymentPlanCycleEnum;
  availablePaymentPlan: AvailablePaymentPlanEntity;
  organization: RelationModel<OrganizationEntity>;
}
