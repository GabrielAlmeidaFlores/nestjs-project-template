import { GetOrganizationResponseDto } from '@module/customer/account/dto/response/get-organization.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListCustomerOrganizationsResponseDto extends ListDataResponseDto<GetOrganizationResponseDto> {
  @ResponseDtoObjectProperty(() => GetOrganizationResponseDto, {
    isArray: true,
  })
  public override resource: GetOrganizationResponseDto[];

  protected override readonly _type = ListCustomerOrganizationsResponseDto.name;
}
