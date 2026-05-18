import { GeneralUrbanRetirementCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/model/general-urban-retirement-complete-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateGeneralUrbanRetirementAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public readonly generalUrbanRetirementCompleteAnalysis: GeneralUrbanRetirementCompleteAnalysisInterface;

  protected override readonly _type =
    CreateGeneralUrbanRetirementAnalysisResultResponseDto.name;
}
