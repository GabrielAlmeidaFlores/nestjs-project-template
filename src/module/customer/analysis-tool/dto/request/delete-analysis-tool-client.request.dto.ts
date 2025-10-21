import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DeleteAnalysisToolClientRequestDto extends BaseBuildableDtoObject {
  @RequestDtoBooleanProperty()
  forceDeleteWithAnalysis?: boolean;
}
