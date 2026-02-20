import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteRuralTimelineAnalysisPeriodPropertyResponseDto extends BaseBuildableDtoObject {
  protected override readonly _type =
    DeleteRuralTimelineAnalysisPeriodPropertyResponseDto.name;
}
