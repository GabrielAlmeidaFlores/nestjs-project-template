import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/value-object/rural-timeline-analysis-cnis-contribution-period-adjustment-id/rural-timeline-analysis-cnis-contribution-period-adjustment-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentId,
  )
  public ruralTimelineAnalysisCnisContributionPeriodAdjustmentId: RuralTimelineAnalysisCnisContributionPeriodAdjustmentId;

  protected override readonly _type =
    CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto.name;
}
