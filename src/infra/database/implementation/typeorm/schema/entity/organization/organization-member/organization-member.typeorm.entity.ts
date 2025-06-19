import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { OrganizationMemberTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/organization/organization-member/organization-member.typeorm.entity.props.interface';

@Entity({ name: 'organization_member' })
export class OrganizationMemberTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'organization', type: 'varchar', length: 100 })
  public organization: string;

  @Column({ name: 'customer', type: 'varchar', length: 100 })
  public customer: string;

  @Column({
    name: 'owner',
    type: 'boolean',
  })
  public owner: boolean;

  protected readonly _type = OrganizationMemberTypeormEntity.name;

  public constructor(props?: OrganizationMemberTypeormEntityPropsInterface) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.organization = props.organization;
    this.customer = props.customer;
    this.owner = props.owner;
  }
}
