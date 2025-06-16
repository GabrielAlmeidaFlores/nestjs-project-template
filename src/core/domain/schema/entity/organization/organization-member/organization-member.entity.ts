import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { OrganizationMemberEntityPropsInterface } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationMemberEntity extends BaseEntity {
  public readonly organization: OrganizationEntity;
  public readonly customer: Guid;

  protected readonly _type = OrganizationMemberEntity.name;

  public constructor(props: OrganizationMemberEntityPropsInterface) {
    super(props);

    this.organization = props.organization;
    this.customer = props.customer;
  }
}
