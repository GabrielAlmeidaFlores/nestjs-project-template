import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialRetirementGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialRetirementGrantCompleteAnalysis?: object;

  @ResponseDtoStringProperty({ required: false })
  public specialRetirementGrantCompleteAnalysisDownload?: string;

  protected override readonly _type =
    CreateSpecialRetirementGrantResultResponseDto.name;
}
