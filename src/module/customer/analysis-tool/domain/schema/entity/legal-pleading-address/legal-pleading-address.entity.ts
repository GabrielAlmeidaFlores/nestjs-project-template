import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingAddressId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { LegalPleadingAddressEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity.props.interface';

export class LegalPleadingAddressEntity extends BaseEntity<LegalPleadingAddressId> {
  public readonly postalCode: PostalCode;
  public readonly stateCode: StateCodeEnum;
  public readonly city: string;
  public readonly neighborhood: string;
  public readonly street: string;
  public readonly addressNumber: number;

  protected readonly _type = LegalPleadingAddressEntity.name;

  public constructor(props: LegalPleadingAddressEntityPropsInterface) {
    super(LegalPleadingAddressId, props);

    this.postalCode = props.postalCode;
    this.stateCode = props.stateCode;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.street = props.street;
    this.addressNumber = props.addressNumber;
  }
}
