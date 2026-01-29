import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class AnalyzeRuralTimelineAnalysisPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  protected override readonly _type =
    AnalyzeRuralTimelineAnalysisPeriodDocumentRequestDto.name;
}
