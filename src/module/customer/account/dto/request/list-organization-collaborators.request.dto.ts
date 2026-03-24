import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListOrganizationCollaboratorsRequestDto extends ListDataRequestDto {
  @RequestDtoStringProperty({ required: false })
  public searchBy?: string;

  protected override readonly _type =
    ListOrganizationCollaboratorsRequestDto.name;
}
