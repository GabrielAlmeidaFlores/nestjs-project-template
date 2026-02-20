import { CurrentYearLegalPleadingMonthCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-legal-pleading-monthly-count-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CurrentYearLegalPleadingMonthCountResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => CurrentYearLegalPleadingMonthCountItemResponseDto,
    {
      isArray: true,
    },
  )
  public legalPleadingMonthly: CurrentYearLegalPleadingMonthCountItemResponseDto[];

  protected override readonly _type =
    CurrentYearLegalPleadingMonthCountResponseDto.name;
}
