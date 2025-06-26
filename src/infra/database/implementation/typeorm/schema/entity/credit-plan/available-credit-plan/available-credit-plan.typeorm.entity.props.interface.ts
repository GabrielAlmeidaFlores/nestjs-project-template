import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';
import type { OrganizationCreditPlanPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-plan/organization-credit-plan-purchase/organization-credit-plan-purchase.typeorm.entity';

export interface AvailableCreditPlanTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  price: string;
  creditAmount: number;
  active: boolean;
  organizationCreditPlan:
    | OrganizationCreditPlanPurchaseTypeormEntity[]
    | undefined;
}
