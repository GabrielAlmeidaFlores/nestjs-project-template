import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization.entity';
import type { OrganizationMemberEntityPropsInterface } from '@core/domain/schema/entity/organization-member/organization-member.entity.props.interface';

export class OrganizationMemberEntity extends BaseEntity {
  public readonly organization: OrganizationEntity;
  public readonly customer: CustomerEntity;

  protected readonly _type = OrganizationMemberEntity.name;

  public constructor(props: OrganizationMemberEntityPropsInterface) {
    super(props);

    this.organization = props.organization;
    this.customer = props.customer;
  }
}
