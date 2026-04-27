import { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';
import { RuralOrHybridRetirementAnalysisFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-first-analysis.interface';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRuralOrHybridRetirementAnalysisFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public ruralOrHybridRetirementAnalysisFirstAnalysis: RuralOrHybridRetirementAnalysisFirstAnalysisInterface;

  @ResponseDtoObjectProperty(() => Object)
  public cnisAnalysis: CnisAnalysisResultModel;

  protected override readonly _type =
    CreateRuralOrHybridRetirementAnalysisFirstAnalysisResponseDto.name;
}
