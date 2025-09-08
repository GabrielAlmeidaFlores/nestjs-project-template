import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'organization' })
export class OrganizationTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({
    name: 'organization_logo',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public organizationLogo: string | null;

  @OneToMany(
    () => OrganizationMemberTypeormEntity,
    (entity) => entity.organization,
  )
  public organizationMember?: OrganizationMemberTypeormEntity[];

  protected override readonly _type = OrganizationTypeormEntity.name;
}
