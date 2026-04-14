import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-work-history-period.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto,
    { isArray: true },
  )
  public periods: GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto[];

  protected override readonly _type =
    ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto.name;
}
