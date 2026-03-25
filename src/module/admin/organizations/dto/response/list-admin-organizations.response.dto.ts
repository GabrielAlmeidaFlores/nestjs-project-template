import { GetAdminOrganizationResponseDto } from '@module/admin/organizations/dto/response/get-admin-organization.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListAdminOrganizationsResponseDto extends ListDataResponseDto<GetAdminOrganizationResponseDto> {
  @ResponseDtoObjectProperty(() => GetAdminOrganizationResponseDto, {
    isArray: true,
  })
  public override resource: GetAdminOrganizationResponseDto[];

  protected override readonly _type = ListAdminOrganizationsResponseDto.name;
}
