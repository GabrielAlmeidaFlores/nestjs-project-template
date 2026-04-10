import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  )
  public survivorPensionAnalysisDwhpId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId;

  protected override readonly _type =
    DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto.name;
}
