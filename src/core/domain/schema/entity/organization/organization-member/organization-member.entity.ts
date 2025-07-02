import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { OrganizationMemberEntityPropsInterface } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class OrganizationMemberEntity extends BaseEntity {
  public readonly organization: OrganizationEntity;
  public readonly customer: RelationModel<CustomerEntity>;
  public readonly owner: boolean;

  protected readonly _type = OrganizationMemberEntity.name;

  public constructor(props: OrganizationMemberEntityPropsInterface) {
    super(props);

    this.organization = props.organization;
    this.customer = props.customer;
    this.owner = props.owner;
  }
}
