import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { OrganizationMemberEntityPropsInterface } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity.props.interface';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export class OrganizationMemberEntity extends BaseEntity {
  public readonly organization: OrganizationEntity;
  public readonly customer: RelationType<CustomerEntity>;

  protected readonly _type = OrganizationMemberEntity.name;

  public constructor(props: OrganizationMemberEntityPropsInterface) {
    super(props);

    this.organization = props.organization;
    this.customer = props.customer;
  }
}
