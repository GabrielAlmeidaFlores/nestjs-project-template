import { SystemActivityItemResponseDto } from '@module/customer/system-activities/dto/response/system-activity-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListSystemActivitiesResponseDto extends ListDataResponseDto<SystemActivityItemResponseDto> {
  @ResponseDtoObjectProperty(() => SystemActivityItemResponseDto, {
    isArray: true,
  })
  public override resource: SystemActivityItemResponseDto[];

  protected override readonly _type = ListSystemActivitiesResponseDto.name;
}
