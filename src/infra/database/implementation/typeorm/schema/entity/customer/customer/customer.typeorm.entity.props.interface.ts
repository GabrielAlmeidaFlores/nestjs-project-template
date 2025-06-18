import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

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
}
