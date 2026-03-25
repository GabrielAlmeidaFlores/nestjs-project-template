import { GetOrganizationCustomizationResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListOrganizationCustomizationsResponseDto extends ListDataResponseDto<GetOrganizationCustomizationResponseDto> {
  @ResponseDtoObjectProperty(() => GetOrganizationCustomizationResponseDto, {
    isArray: true,
  })
  public override resource: GetOrganizationCustomizationResponseDto[];

  protected override readonly _type =
    ListOrganizationCustomizationsResponseDto.name;
}
