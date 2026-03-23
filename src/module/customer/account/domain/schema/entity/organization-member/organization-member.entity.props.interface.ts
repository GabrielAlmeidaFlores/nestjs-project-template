import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export interface OrganizationMemberEntityPropsInterface extends BaseEntityPropsInterface<OrganizationMemberId> {
  organization: OrganizationEntity;
  customer: CustomerEntity;
  owner: boolean;
  isActive?: boolean | null;
}
