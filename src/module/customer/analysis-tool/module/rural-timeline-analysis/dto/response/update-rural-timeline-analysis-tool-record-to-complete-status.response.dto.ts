import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateRuralTimelineAnalysisToolRecordToCompleteStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralTimelineAnalysisId)
  public ruralTimelineAnalysisId: RuralTimelineAnalysisId;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisToolRecordToCompleteStatusResponseDto.name;
}
