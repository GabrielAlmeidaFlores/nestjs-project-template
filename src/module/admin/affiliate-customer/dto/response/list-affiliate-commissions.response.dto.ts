import { AffiliateCommissionItemResponseDto } from '@module/customer/affiliate-customer/dto/response/list-my-affiliate-commissions.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListAffiliateCommissionsResponseDto extends ListDataResponseDto<AffiliateCommissionItemResponseDto> {
  @ResponseDtoObjectProperty(() => AffiliateCommissionItemResponseDto, {
    isArray: true,
  })
  public override resource: AffiliateCommissionItemResponseDto[];

  protected override readonly _type = ListAffiliateCommissionsResponseDto.name;
}
