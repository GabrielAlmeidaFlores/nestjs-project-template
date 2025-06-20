import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import { OrganizationTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/organization/organization/organization.typeorm.entity.props.interface';

@Entity({ name: 'organization' })
export class OrganizationTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'organization_logo', type: 'varchar', length: 50 })
  public organizationLogo: string;

  protected readonly _type = OrganizationTypeormEntity.name;

  public constructor(props?: OrganizationTypeormEntityPropsInterface) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.name = props.name;
    this.organizationLogo = props.organizationLogo;
  }
}
