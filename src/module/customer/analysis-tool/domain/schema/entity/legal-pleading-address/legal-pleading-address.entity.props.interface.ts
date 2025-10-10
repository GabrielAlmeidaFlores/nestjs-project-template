import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { LegalPleadingAddressId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';

export interface LegalPleadingAddressEntityPropsInterface
  extends BaseEntityPropsInterface<LegalPleadingAddressId> {
  postalCode: PostalCode;
  stateCode: StateCodeEnum;
  city: string;
  neighborhood: string;
  street: string;
  addressNumber: number;
}
