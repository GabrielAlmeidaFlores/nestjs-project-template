import { SpecialRetirementGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/special-retirement-grant/model/generic/special-retirement-grant-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialRetirementGrantFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => SpecialRetirementGrantFirstAnalysisModel)
  public specialRetirementGrantFirstAnalysis: SpecialRetirementGrantFirstAnalysisModel;

  protected override readonly _type =
    CreateSpecialRetirementGrantFirstAnalysisResponseDto.name;
}
