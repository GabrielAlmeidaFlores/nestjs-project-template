import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

@ResponseDto()
export class DeleteRuralTimelineAnalysisPeriodPropertyResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralTimelineAnalysisPeriodPropertyId)
  public ruralTimelineAnalysisPeriodPropertyId: RuralTimelineAnalysisPeriodPropertyId;

  protected override readonly _type =
    DeleteRuralTimelineAnalysisPeriodPropertyResponseDto.name;
}
