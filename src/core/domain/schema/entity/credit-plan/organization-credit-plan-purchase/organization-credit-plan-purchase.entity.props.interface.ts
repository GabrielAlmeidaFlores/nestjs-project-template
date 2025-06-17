import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface OrganizationCreditPlanPurchaseEntityPropsInterface
  extends BaseEntityPropsInterface {
  price: string;
  creditAmount: number;
  active: boolean;
  organization: Guid;
  creditPlan: Guid;
  bankPayment: Guid;
}
