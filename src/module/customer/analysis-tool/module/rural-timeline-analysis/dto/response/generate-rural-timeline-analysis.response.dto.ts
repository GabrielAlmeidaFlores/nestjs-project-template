import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GenerateRuralTimelineAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public ruralTimelineCompleteAnalysis: string;

  @ResponseDtoDateProperty({ required: false })
  public lastAffiliationDate?: Date;

  protected override readonly _type =
    GenerateRuralTimelineAnalysisResponseDto.name;
}
