import { SpecialRetirementRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/special-retirement-rejection/model/special-retirement-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialRetirementRejectionFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => SpecialRetirementRejectionFirstAnalysisModel)
  public specialRetirementRejectionFirstAnalysis: SpecialRetirementRejectionFirstAnalysisModel;

  protected override readonly _type =
    CreateSpecialRetirementRejectionFirstAnalysisResponseDto.name;
}
