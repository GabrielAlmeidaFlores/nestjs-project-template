import { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralTimelineCnisContributionPeriodOverdueContributionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralTimelineCnisContributionPeriodOverdueContributionId,
  )
  public ruralTimelineCnisContributionPeriodOverdueContributionId: RuralTimelineCnisContributionPeriodOverdueContributionId;

  protected override readonly _type =
    CreateRuralTimelineCnisContributionPeriodOverdueContributionResponseDto.name;
}
