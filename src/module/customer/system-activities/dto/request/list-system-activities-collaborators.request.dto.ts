import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListSystemActivitiesCollaboratorsRequestDto extends ListDataRequestDto {
  @RequestDtoStringProperty({
    required: false,
    description:
      'Busca em OR pelo nome do colaborador ou pelo e-mail (e-mail com termo em minúsculas).',
  })
  public override search?: string;

  protected override readonly _type =
    ListSystemActivitiesCollaboratorsRequestDto.name;
}
