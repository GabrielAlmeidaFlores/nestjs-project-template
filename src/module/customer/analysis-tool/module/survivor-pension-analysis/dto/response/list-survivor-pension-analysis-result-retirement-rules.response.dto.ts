import { GetSurvivorPensionAnalysisResultRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-retirement-rule.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListSurvivorPensionAnalysisResultRetirementRulesResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisResultRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: GetSurvivorPensionAnalysisResultRetirementRuleResponseDto[];

  protected override readonly _type =
    ListSurvivorPensionAnalysisResultRetirementRulesResponseDto.name;
}
