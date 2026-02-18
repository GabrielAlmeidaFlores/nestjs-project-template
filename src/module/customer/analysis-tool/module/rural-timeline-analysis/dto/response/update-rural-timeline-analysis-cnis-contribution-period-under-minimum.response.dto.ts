import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/value-object/rural-timeline-analysis-cnis-contribution-period-under-minimum-id/rural-timeline-analysis-cnis-contribution-period-under-minimum-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId,
  )
  public ruralTimelineAnalysisCnisContributionPeriodUnderMinimumId: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto.name;
}
