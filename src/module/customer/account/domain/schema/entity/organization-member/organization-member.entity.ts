import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import type { OrganizationMemberEntityPropsInterface } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity.props.interface';

export class OrganizationMemberEntity extends BaseEntity<OrganizationMemberId> {
  public readonly organization: OrganizationEntity;
  public readonly customer: CustomerEntity;
  public readonly owner: boolean;

  protected readonly _type = OrganizationMemberEntity.name;

  public constructor(props: OrganizationMemberEntityPropsInterface) {
    super(OrganizationMemberId, props);

    this.organization = props.organization;
    this.customer = props.customer;
    this.owner = props.owner;
  }
}
