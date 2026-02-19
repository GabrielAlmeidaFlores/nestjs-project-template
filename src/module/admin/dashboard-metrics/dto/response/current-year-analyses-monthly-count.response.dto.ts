import { CurrentYearAnalysesMonthCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-analyses-monthly-count-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CurrentYearAnalysesMonthCountResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => CurrentYearAnalysesMonthCountItemResponseDto,
    {
      isArray: true,
    },
  )
  public analysesMonthly: CurrentYearAnalysesMonthCountItemResponseDto[];

  protected override readonly _type =
    CurrentYearAnalysesMonthCountResponseDto.name;
}
