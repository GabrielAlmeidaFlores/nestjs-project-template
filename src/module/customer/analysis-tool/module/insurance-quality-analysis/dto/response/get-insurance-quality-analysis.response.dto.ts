import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetInsuranceQualityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(InsuranceQualityAnalysisId)
  public insuranceQualityAnalysisId: InsuranceQualityAnalysisId;

  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public cnisDocument?: string;

  @ResponseDtoStringProperty({ required: false })
  public ruralDocument?: string;

  @ResponseDtoStringProperty({ required: false })
  public complementaryDocument?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisBenefitNumber?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisBenefitType?: string;

  @ResponseDtoDateProperty({ required: false })
  public analysisBenefitConcessionDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public analysisBenefitCessationDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public analysisHasPreviousBenefit?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public analysisPreviousBenefitDetails?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisContributionSituation?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public analysisHasRuralActivity?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public analysisRuralActivityDetails?: string;

  @ResponseDtoStringProperty({ required: false })
  public insuranceQualityConclusion?: string;

  @ResponseDtoStringProperty({ required: false })
  public gracePeriodConclusion?: string;

  @ResponseDtoStringProperty({ required: false })
  public finalRecommendation?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisSummary?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetInsuranceQualityAnalysisResponseDto.name;
}
