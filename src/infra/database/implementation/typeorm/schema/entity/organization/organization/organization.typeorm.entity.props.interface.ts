import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';
import type { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization/organization-member/organization-member.typeorm.entity';

export interface OrganizationTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  name: string;
  organizationLogo: string;
  organizationMember: OrganizationMemberTypeormEntity[] | undefined;
}
