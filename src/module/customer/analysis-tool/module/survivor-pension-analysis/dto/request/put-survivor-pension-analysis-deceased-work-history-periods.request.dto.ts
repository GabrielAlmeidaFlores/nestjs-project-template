import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodItemRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/survivor-pension-analysis-deceased-work-history-period-item.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => SurvivorPensionAnalysisDeceasedWorkHistoryPeriodItemRequestDto,
    { isArray: true },
  )
  public periods: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodItemRequestDto[];

  protected override readonly _type =
    PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsRequestDto.name;
}
