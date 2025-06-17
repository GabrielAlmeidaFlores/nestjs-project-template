import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface OrganizationCreditUsageEntityPropsInterface
  extends BaseEntityPropsInterface {
  organization: Guid;
  paidResource: Guid;
  creditAmount: number;
  customer: Guid;
}
