import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface OrganizationTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  name: string;
  organizationLogo: string;
}
