import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { OrganizationEntityPropsInterface } from '@core/domain/schema/entity/organization/organization/organization.entity.props.interface';

export class OrganizationEntity extends BaseEntity {
  public readonly name: string;
  public readonly organizationLogo: string | null;

  protected readonly _type = OrganizationEntity.name;

  public constructor(props: OrganizationEntityPropsInterface) {
    super(props);

    this.name = props.name;
    this.organizationLogo = props.organizationLogo ?? null;
  }
}
