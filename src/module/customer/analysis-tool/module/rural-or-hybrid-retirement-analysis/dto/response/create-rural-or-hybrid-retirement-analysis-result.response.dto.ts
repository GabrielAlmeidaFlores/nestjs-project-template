import { RuralOrHybridRetirementAnalysisResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-result.interface';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralOrHybridRetirementAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public ruralOrHybridRetirementAnalysisResult: RuralOrHybridRetirementAnalysisResultInterface;

  protected override readonly _type =
    CreateRuralOrHybridRetirementAnalysisResultResponseDto.name;
}
