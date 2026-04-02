import { GetOrganizationCollaboratorResponseDto } from '@module/customer/account/dto/response/get-organization-collaborator.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListOrganizationCollaboratorsResponseDto extends ListDataResponseDto<GetOrganizationCollaboratorResponseDto> {
  @ResponseDtoObjectProperty(() => GetOrganizationCollaboratorResponseDto, {
    isArray: true,
  })
  public override resource: GetOrganizationCollaboratorResponseDto[];

  protected override readonly _type =
    ListOrganizationCollaboratorsResponseDto.name;
}
