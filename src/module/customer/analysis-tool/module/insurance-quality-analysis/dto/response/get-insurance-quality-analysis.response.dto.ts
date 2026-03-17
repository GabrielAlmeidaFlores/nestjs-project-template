import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { InsuranceQualityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/enum/insurance-quality-analysis-document-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetInsuranceQualityAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(InsuranceQualityAnalysisDocumentTypeEnum)
  public type: InsuranceQualityAnalysisDocumentTypeEnum;

  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetInsuranceQualityAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetInsuranceQualityAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @ResponseDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public clientLastAffiliationDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public insuranceQualityConclusion?: string;

  @ResponseDtoStringProperty({ required: false })
  public gracePeriodConclusion?: string;

  @ResponseDtoStringProperty({ required: false })
  public finalRecommendation?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisSummary?: string;

  protected override readonly _type =
    GetInsuranceQualityAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetInsuranceQualityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(InsuranceQualityAnalysisId)
  public insuranceQualityAnalysisId: InsuranceQualityAnalysisId;

  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @ResponseDtoObjectProperty(
    () => GetInsuranceQualityAnalysisDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?:
    | GetInsuranceQualityAnalysisDocumentResponseDto[]
    | undefined;

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

  @ResponseDtoBooleanProperty({ required: false })
  public analysisIsWorkAccidentOrSeriousIllness?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public analysisIsSeriousIllnessArt151?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public analysisSeriousIllnesses?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisOtherSeriousIllness?: string;

  @ResponseDtoDateProperty({ required: false })
  public analysisDiseaseStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public analysisRuralStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public analysisRuralEndDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public analysisHadInvoluntaryUnemployment?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public analysisIntendsToProveByTestimony?: boolean;

  @ResponseDtoObjectProperty(
    () => GetInsuranceQualityAnalysisResultResponseDto,
    {
      required: false,
    },
  )
  public insuranceQualityAnalysisResult?:
    | GetInsuranceQualityAnalysisResultResponseDto
    | undefined;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetInsuranceQualityAnalysisResponseDto.name;
}
