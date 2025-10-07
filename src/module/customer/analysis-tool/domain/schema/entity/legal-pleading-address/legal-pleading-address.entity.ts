import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingAddressId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { LegalPleadingAddressEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity.props.interface';

export class LegalPleadingAddressEntity extends BaseEntity<LegalPleadingAddressId> {
  @Description('Código postal (CEP) do endereço da peça processual.')
  public readonly postalCode: PostalCode;

  @Description('Código do estado do endereço relacionado à peça processual.')
  public readonly stateCode: StateCodeEnum;

  @Description('Cidade do endereço relacionado à peça processual.')
  public readonly city: string;

  @Description('Bairro do endereço relacionado à peça processual.')
  public readonly neighborhood: string;

  @Description('Rua do endereço relacionado à peça processual.')
  public readonly street: string;

  @Description('Número do endereço relacionado à peça processual.')
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
