import { AffiliateCommissionItemResponseDto } from '@module/customer/affiliate-customer/dto/response/list-my-affiliate-commissions.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListAffiliateCommissionsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => AffiliateCommissionItemResponseDto, {
    isArray: true,
  })
  public commissions: AffiliateCommissionItemResponseDto[];

  protected override readonly _type = ListAffiliateCommissionsResponseDto.name;
}
