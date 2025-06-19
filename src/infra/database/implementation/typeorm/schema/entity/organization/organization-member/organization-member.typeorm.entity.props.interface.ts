import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface OrganizationMemberTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  organization: string;
  customer: string;
  owner: boolean;
}
