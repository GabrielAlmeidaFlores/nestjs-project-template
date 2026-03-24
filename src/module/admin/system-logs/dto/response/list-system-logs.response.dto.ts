import { SystemLogItemResponseDto } from '@module/admin/system-logs/dto/response/system-log-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListSystemLogsResponseDto extends ListDataResponseDto<SystemLogItemResponseDto> {
  @ResponseDtoObjectProperty(() => SystemLogItemResponseDto, {
    isArray: true,
  })
  public override resource: SystemLogItemResponseDto[];

  protected override readonly _type = ListSystemLogsResponseDto.name;
}
