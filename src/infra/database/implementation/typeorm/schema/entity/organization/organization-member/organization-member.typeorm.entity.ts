import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer/customer.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization/organization/organization.typeorm.entity';

@Entity({ name: 'organization_member' })
export class OrganizationMemberTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => OrganizationTypeormEntity,
    (entity) => entity.organizationMember,
  )
  @JoinColumn({ name: 'organization' })
  public organization: OrganizationTypeormEntity;

  @ManyToOne(
    () => CustomerTypeormEntity,
    (entity) => entity.organizationMemberCustomer,
  )
  @JoinColumn({ name: 'name' })
  public customer: CustomerTypeormEntity;

  protected readonly _type = OrganizationMemberTypeormEntity.name;
}
