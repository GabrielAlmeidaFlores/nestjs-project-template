import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateMyAffiliatePixKeyRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public pixAddressKey: string;

  @RequestDtoEnumProperty(PixAddressKeyTypeEnum)
  public pixAddressKeyType: PixAddressKeyTypeEnum;

  protected override readonly _type = UpdateMyAffiliatePixKeyRequestDto.name;
}
