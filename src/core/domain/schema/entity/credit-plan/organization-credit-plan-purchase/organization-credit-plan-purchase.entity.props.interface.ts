import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CreditPlanEntity } from '@core/domain/schema/entity/credit-plan/credit-plan/credit-plan.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export interface OrganizationCreditPlanPurchaseEntityPropsInterface
  extends BaseEntityPropsInterface {
  price: string;
  creditAmount: number;
  active: boolean;
  creditPlan: CreditPlanEntity;
  organization: RelationType<OrganizationEntity>;
  bankPayment: RelationType<BankPaymentEntity>;
}
