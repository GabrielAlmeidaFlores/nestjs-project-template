import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';
import type { AvailableCreditPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-plan/available-credit-plan/available-credit-plan.typeorm.entity';
import type { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization/organization/organization.typeorm.entity';

export interface OrganizationCreditPlanPurchaseTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  price: string;
  creditAmount: number;
  active: boolean;
  organization: OrganizationTypeormEntity;
  availableCreditPlan: AvailableCreditPlanTypeormEntity;
    //TODO: add bank-payment relationship
}
