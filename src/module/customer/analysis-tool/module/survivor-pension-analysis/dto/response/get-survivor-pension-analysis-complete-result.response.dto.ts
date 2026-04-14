import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { GetSurvivorPensionAnalysisResultRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-retirement-rule.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSurvivorPensionAnalysisCompleteResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisResultId)
  public survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;

  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisId)
  public survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @ResponseDtoBooleanProperty({ required: false })
  public isInsuredStatusConfirmed?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public insuredStatusSummary?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public isRetirementRightConfirmed?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public retirementRightSummary?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public simplifiedAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisResultRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: GetSurvivorPensionAnalysisResultRetirementRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto,
    { isArray: true },
  )
  public dependentPensionAnalyses: GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisCompleteResultResponseDto.name;
}
