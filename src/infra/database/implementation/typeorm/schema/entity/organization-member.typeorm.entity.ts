import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';

@Entity({ name: 'organization_member' })
export class OrganizationMemberTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => OrganizationTypeormEntity,
    (entity) => entity.organizationMember,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationTypeormEntity;

  @ManyToOne(() => CustomerTypeormEntity, (entity) => entity.organizationMember)
  @JoinColumn({ name: 'customer_id' })
  public customer: CustomerTypeormEntity;

  protected override readonly _type = OrganizationMemberTypeormEntity.name;
}
