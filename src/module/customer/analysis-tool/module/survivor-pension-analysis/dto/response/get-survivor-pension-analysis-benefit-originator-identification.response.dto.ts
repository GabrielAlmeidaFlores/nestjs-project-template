import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  )
  public survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId;

  @ResponseDtoValueObjectProperty(SurvivorPensionAnalysisId)
  public survivorPensionAnalysisId: SurvivorPensionAnalysisId;

  @ResponseDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @ResponseDtoDateProperty({ required: false })
  public deathDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public federativeEntity?: string;

  @ResponseDtoStringProperty({ required: false })
  public stateCode?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public beneficiaryWasRetired?: boolean;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto.name;
}
