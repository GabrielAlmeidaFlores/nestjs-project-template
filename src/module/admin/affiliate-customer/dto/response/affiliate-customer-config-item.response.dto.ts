import { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AffiliateCustomerConfigItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(AffiliateCustomerConfigConfigEnum)
  public affiliateCustomerConfigConfigEnum: AffiliateCustomerConfigConfigEnum;

  @ResponseDtoStringProperty()
  public value: string;

  protected override readonly _type =
    AffiliateCustomerConfigItemResponseDto.name;
}
