import { AffiliateBankTransferItemResponseDto } from '@module/customer/affiliate-customer/dto/response/affiliate-bank-transfer-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListAffiliateTransfersResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => AffiliateBankTransferItemResponseDto, {
    isArray: true,
  })
  public transfers: AffiliateBankTransferItemResponseDto[];

  protected override readonly _type = ListAffiliateTransfersResponseDto.name;
}
