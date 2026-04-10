import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SurvivorPensionAnalysisResultDependentPensionAnalysisId,
  )
  public survivorPensionAnalysisDpaId: SurvivorPensionAnalysisResultDependentPensionAnalysisId;

  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisResultId)
  public survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;

  @ResponseDtoStringProperty({ required: false })
  public dependentName?: string;

  @ResponseDtoStringProperty({ required: false })
  public dependencyDegree?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public isDependencyVerified?: boolean;

  @ResponseDtoDateProperty({ required: false })
  public pensionStartDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public estimatedPensionDuration?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto.name;
}
