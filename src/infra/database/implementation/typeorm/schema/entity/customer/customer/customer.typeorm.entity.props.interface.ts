import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';
import type { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer-address/customer-address.typeorm.entity';
import type { CustomerProfessionalDataTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer-professional-data/customer-professional-data.typeorm.entity';

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
  customerAddress: CustomerAddressTypeormEntity | undefined;
  customerProfessionalData: CustomerProfessionalDataTypeormEntity | undefined;
}
