import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementAnalysisObjectiveTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/retirement-analysis-objective-type.enum';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { RetirementDocumentTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/enum/retirement-document-type-category.enum';
import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import { RecognitionStatusEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/enum/recognition-status.enum';
import { SpecialCategoryRetirementAnalysisResultConversionItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/value-object/special-category-retirement-analysis-result-conversion-item-id/special-category-retirement-analysis-result-conversion-item-id.value-object';
import { SpecialCategoryRetirementAnalysisResultRuleItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/value-object/special-category-retirement-analysis-result-rule-item-id/special-category-retirement-analysis-result-rule-item-id.value-object';
import { PublicServiceTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/public-service-type-category.enum';
import { SpecialTimeRegistrationTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/special-time-registration-type.enum';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SpecialCategoryRetirementAnalysisPeriodDocumentId,
  )
  public specialCategoryRetirementAnalysisPeriodDocumentId: SpecialCategoryRetirementAnalysisPeriodDocumentId;

  @ResponseDtoEnumProperty(RetirementDocumentTypeCategoryEnum)
  public retirementDocumentTypeCategory: RetirementDocumentTypeCategoryEnum;

  @ResponseDtoStringProperty()
  public signedFileUrl: string;

  @ResponseDtoStringProperty()
  public originalFileUploadName: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetSpecialCategoryRetirementAnalysisWorkPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialCategoryRetirementAnalysisWorkPeriodId)
  public specialCategoryRetirementAnalysisWorkPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId;

  @ResponseDtoDateProperty({ required: false })
  public publicServiceAdmissionDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public publicServiceCareerStartDate?: Date;

  @ResponseDtoDateProperty()
  public workPeriodStartDate: Date;

  @ResponseDtoDateProperty()
  public workPeriodEndDate: Date;

  @ResponseDtoStringProperty({ required: false })
  public jobPositionTitle?: string;

  @ResponseDtoStringProperty({ required: false })
  public careerPathName?: string;

  @ResponseDtoEnumProperty(PublicServiceTypeCategoryEnum, { required: false })
  public publicServiceTypeCategory?: PublicServiceTypeCategoryEnum;

  @ResponseDtoEnumProperty(SpecialTimeRegistrationTypeEnum)
  public specialTimeRegistrationType: SpecialTimeRegistrationTypeEnum;

  @ResponseDtoDateProperty({ required: false })
  public effectiveSpecialWorkStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public effectiveSpecialWorkEndDate?: Date;

  @ResponseDtoObjectProperty(
    () => GetSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto,
    { isArray: true },
  )
  public periodDocuments: GetSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialCategoryRetirementAnalysisWorkPeriodResponseDto.name;
}

@ResponseDto()
export class GetSpecialCategoryRetirementAnalysisResultConversionItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SpecialCategoryRetirementAnalysisResultConversionItemId,
  )
  public specialCategoryRetirementAnalysisResultConversionItemId: SpecialCategoryRetirementAnalysisResultConversionItemId;

  @ResponseDtoStringProperty()
  public originJobTitleDescription: string;

  @ResponseDtoStringProperty()
  public periodDateRangeText: string;

  @ResponseDtoStringProperty()
  public harmfulExposureAgentsText: string;

  @ResponseDtoStringProperty()
  public specialTimeDurationText: string;

  @ResponseDtoStringProperty()
  public convertedTimeDurationText: string;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public conversionFactorValue: DecimalValue;

  @ResponseDtoEnumProperty(RecognitionStatusEnum)
  public recognitionStatusEnum: RecognitionStatusEnum;

  protected override readonly _type =
    GetSpecialCategoryRetirementAnalysisResultConversionItemResponseDto.name;
}

@ResponseDto()
export class GetSpecialCategoryRetirementAnalysisResultRuleItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SpecialCategoryRetirementAnalysisResultRuleItemId,
  )
  public specialCategoryRetirementAnalysisResultRuleItemId: SpecialCategoryRetirementAnalysisResultRuleItemId;

  @ResponseDtoStringProperty()
  public retirementModalityName: string;

  @ResponseDtoBooleanProperty()
  public isRequirementMet: boolean;

  @ResponseDtoDateProperty({ required: false })
  public projectedRetirementDate?: Date;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public estimatedRmiAmount?: DecimalValue;

  @ResponseDtoBooleanProperty()
  public isBestFinancialOption: boolean;

  @ResponseDtoStringProperty({ required: false })
  public ruleDetailedExplanationText?: string;

  protected override readonly _type =
    GetSpecialCategoryRetirementAnalysisResultRuleItemResponseDto.name;
}

@ResponseDto()
export class GetSpecialCategoryRetirementAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialCategoryRetirementAnalysisResultId)
  public specialCategoryRetirementAnalysisResultId: SpecialCategoryRetirementAnalysisResultId;

  @ResponseDtoStringProperty({ required: false })
  public simplifiedAnalysisSummaryText?: string;

  @ResponseDtoStringProperty({ required: false })
  public fullAnalysisConclusionText?: string;

  @ResponseDtoStringProperty({ required: false })
  public administrativeProcedureAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => GetSpecialCategoryRetirementAnalysisResultConversionItemResponseDto,
    { isArray: true },
  )
  public conversionItems: GetSpecialCategoryRetirementAnalysisResultConversionItemResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialCategoryRetirementAnalysisResultRuleItemResponseDto,
    { isArray: true },
  )
  public ruleItems: GetSpecialCategoryRetirementAnalysisResultRuleItemResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialCategoryRetirementAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetSpecialCategoryRetirementAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialCategoryRetirementAnalysisId)
  public specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;

  @ResponseDtoEnumProperty(RetirementAnalysisObjectiveTypeEnum, {
    required: false,
  })
  public retirementAnalysisObjectiveType?: RetirementAnalysisObjectiveTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public analysisCustomName?: string;

  @ResponseDtoStringProperty({ required: false })
  public publicServiceFederativeEntityName?: string;

  @ResponseDtoStringProperty({ required: false })
  public publicServiceStateAbbreviation?: string;

  @ResponseDtoBooleanProperty()
  public hasConfirmedExposureToHarmfulAgents: boolean;

  @ResponseDtoObjectProperty(
    () => GetSpecialCategoryRetirementAnalysisWorkPeriodResponseDto,
    { isArray: true },
  )
  public workPeriods: GetSpecialCategoryRetirementAnalysisWorkPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialCategoryRetirementAnalysisResultResponseDto,
    { required: false },
  )
  public analysisResult?: GetSpecialCategoryRetirementAnalysisResultResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialCategoryRetirementAnalysisResponseDto.name;
}
