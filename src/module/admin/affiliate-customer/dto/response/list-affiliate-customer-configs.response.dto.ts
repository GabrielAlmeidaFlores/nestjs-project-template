import { AffiliateCustomerConfigItemResponseDto } from '@module/admin/affiliate-customer/dto/response/affiliate-customer-config-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListAffiliateCustomerConfigsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => AffiliateCustomerConfigItemResponseDto, {
    isArray: true,
  })
  public configs: AffiliateCustomerConfigItemResponseDto[];

  protected override readonly _type =
    ListAffiliateCustomerConfigsResponseDto.name;
}
