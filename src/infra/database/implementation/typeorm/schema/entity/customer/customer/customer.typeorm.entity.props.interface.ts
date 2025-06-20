import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';
import type { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization/organization-member/organization-member.typeorm.entity';

export interface CustomerTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  name: string;
  email: string;
  federalDocument: string;
  phoneNumber: string;
  password: string;
  bankExternalId: string;
  profilePicture: string | null;
  mfaSecret: string | null;
  organizationMemberCustomer: OrganizationMemberTypeormEntity[] | undefined;
}
