import { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSurvivorPensionAnalysisResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisResultRetirementRuleId)
  public survivorPensionAnalysisRrId: SurvivorPensionAnalysisResultRetirementRuleId;

  protected override readonly _type =
    CreateSurvivorPensionAnalysisResultRetirementRuleResponseDto.name;
}
