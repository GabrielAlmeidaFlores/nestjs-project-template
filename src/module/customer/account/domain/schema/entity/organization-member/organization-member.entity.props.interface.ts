import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';

export interface OrganizationMemberEntityPropsInterface
  extends BaseEntityPropsInterface {
  organization: OrganizationEntity;
  customer: CustomerEntity;
  owner: boolean;
}
