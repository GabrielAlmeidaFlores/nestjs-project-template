import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';

@ResponseDto()
export class DeleteRuralTimelineAnalysisPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralTimelineAnalysisPeriodDocumentId)
  public ruralTimelineAnalysisPeriodDocumentId: RuralTimelineAnalysisPeriodDocumentId;

  protected override readonly _type =
    DeleteRuralTimelineAnalysisPeriodDocumentResponseDto.name;
}
