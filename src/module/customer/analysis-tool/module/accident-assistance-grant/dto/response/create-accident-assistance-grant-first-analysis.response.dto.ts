import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAccidentAssistanceGrantFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public firstAnalysis: string;

  @ResponseDtoStringProperty()
  public analysisConclusion: string;

  @ResponseDtoStringProperty({ required: false })
  public expectedRmi?: string;

  @ResponseDtoStringProperty({ required: false })
  public estimatedCaseValue?: string;

  protected override readonly _type =
    CreateAccidentAssistanceGrantFirstAnalysisResponseDto.name;
}
