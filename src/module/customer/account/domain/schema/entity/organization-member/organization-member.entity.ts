import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import type { OrganizationMemberEntityPropsInterface } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity.props.interface';

export class OrganizationMemberEntity extends BaseEntity<OrganizationMemberId> {
  @Description('Organização à qual o membro pertence.')
  public readonly organization: OrganizationEntity;

  @Description('Cliente que é membro da organização.')
  public readonly customer: CustomerEntity;

  @Description('Indica se o membro é o proprietário da organização.')
  public readonly owner: boolean;

  @Description('Indica se o membro está ativo na organização.')
  public readonly isActive: boolean;

  protected readonly _type = OrganizationMemberEntity.name;

  public constructor(props: OrganizationMemberEntityPropsInterface) {
    super(OrganizationMemberId, props);

    this.organization = props.organization;
    this.customer = props.customer;
    this.owner = props.owner;
    this.isActive = props.isActive ?? true;
  }
}
