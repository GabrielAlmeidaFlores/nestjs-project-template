import { OrganizationCollaboratorWithStatsItemResponseDto } from '@module/customer/system-activities/dto/response/organization-collaborator-with-stats-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListOrganizationCollaboratorsWithStatsResponseDto extends ListDataResponseDto<OrganizationCollaboratorWithStatsItemResponseDto> {
  @ResponseDtoObjectProperty(
    () => OrganizationCollaboratorWithStatsItemResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: OrganizationCollaboratorWithStatsItemResponseDto[];

  protected override readonly _type =
    ListOrganizationCollaboratorsWithStatsResponseDto.name;
}
