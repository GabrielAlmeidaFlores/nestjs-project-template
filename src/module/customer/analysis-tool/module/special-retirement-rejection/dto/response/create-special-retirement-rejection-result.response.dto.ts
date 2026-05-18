import { SpecialRetirementRejectionCompleteAnalysisModel } from '@module/customer/analysis-tool/module/special-retirement-rejection/model/special-retirement-rejection-complete-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialRetirementRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialRetirementRejectionCompleteAnalysisModel,
  )
  public specialRetirementRejectionCompleteAnalysis: SpecialRetirementRejectionCompleteAnalysisModel;

  protected override readonly _type =
    CreateSpecialRetirementRejectionResultResponseDto.name;
}
