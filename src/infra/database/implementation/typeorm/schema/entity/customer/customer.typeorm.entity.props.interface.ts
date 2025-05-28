import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base.typeorm.entity.props.interface';

export interface CustomerTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  name: string;
  email: string;
  federalDocument: string;
  phoneNumber: string;
  password: string;
  profilePicture?: string | null;
  mfaSecret?: string | null;
  city: string;
  neighborhood: string;
  countryState: string;
  postalCode: string;
  addressNumber: string;
}
