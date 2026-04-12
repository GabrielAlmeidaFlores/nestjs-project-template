import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSurvivorPensionAnalysisResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisResultRetirementRuleId)
  public survivorPensionAnalysisResultRetirementRuleId: SurvivorPensionAnalysisResultRetirementRuleId;

  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisResultId)
  public survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;

  @ResponseDtoStringProperty({ required: false })
  public ruleName?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public isRequirementMet?: boolean;

  @ResponseDtoDateProperty({ required: false })
  public entitlementDate?: Date;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public estimatedRmi?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public isBestRmi?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public isHighestClaimValue?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public detailedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisResultRetirementRuleResponseDto.name;
}
