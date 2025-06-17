import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface OrganizationCreditPurchaseEntityPropsInterface
  extends BaseEntityPropsInterface {
  organization: Guid;
  paidResources: Guid;
  creditAmount: number;
  customer: Guid;
}
