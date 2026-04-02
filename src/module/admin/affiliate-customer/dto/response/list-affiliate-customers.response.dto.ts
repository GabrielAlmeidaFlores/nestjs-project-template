import { GetAffiliateCustomerResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListAffiliateCustomersResponseDto extends ListDataResponseDto<GetAffiliateCustomerResponseDto> {
  @ResponseDtoObjectProperty(() => GetAffiliateCustomerResponseDto, {
    isArray: true,
  })
  public override resource: GetAffiliateCustomerResponseDto[];

  protected override readonly _type = ListAffiliateCustomersResponseDto.name;
}
