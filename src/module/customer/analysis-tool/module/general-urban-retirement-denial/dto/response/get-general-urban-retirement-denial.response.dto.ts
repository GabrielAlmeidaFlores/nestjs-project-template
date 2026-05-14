import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementDenialCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/enum/general-urban-retirement-denial-category.enum';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-inss.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-judicial.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-type.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-viability.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';
import { GeneralUrbanRetirementDenialFirstAnalysisModel } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/generic/general-urban-retirement-denial-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetGeneralUrbanRetirementDenialTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementDenialTimeAcceleratorId)
  public id: GeneralUrbanRetirementDenialTimeAcceleratorId;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum)
  public type: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum,
  )
  public viability: GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoBooleanProperty()
  public affectsQualifyingPeriod: boolean;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialTimeAcceleratorResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialCompleteAnalysisClientDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public federalDocument: string;

  @ResponseDtoDateProperty({ required: false })
  public lastAffiliationDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoStringProperty()
  public gender: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialCompleteAnalysisClientDataResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialCompleteAnalysisRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public retirementRuleName: string;

  @ResponseDtoBooleanProperty()
  public isEligible: boolean;

  @ResponseDtoDateProperty({ required: false })
  public eligibilityAvailableAt?: Date;

  @ResponseDtoNumberProperty()
  public expectedMonthlyBenefit: number;

  @ResponseDtoBooleanProperty()
  public isBestRmi: boolean;

  @ResponseDtoBooleanProperty()
  public isHighestCauseValue: boolean;

  @ResponseDtoStringProperty()
  public retirementAnalysis: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialCompleteAnalysisRetirementRuleResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialCompleteAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementDenialCompleteAnalysisClientDataResponseDto,
  )
  public clientData: GetGeneralUrbanRetirementDenialCompleteAnalysisClientDataResponseDto;

  @ResponseDtoObjectProperty(
    () =>
      GetGeneralUrbanRetirementDenialCompleteAnalysisRetirementRuleResponseDto,
    { isArray: true },
  )
  public retirementRules: GetGeneralUrbanRetirementDenialCompleteAnalysisRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public analysisResult: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialCompleteAnalysisResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialCurrentResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => GeneralUrbanRetirementDenialFirstAnalysisModel,
    { required: false },
  )
  public generalUrbanRetirementDenialFirstAnalysis?: GeneralUrbanRetirementDenialFirstAnalysisModel;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementDenialCompleteAnalysisResponseDto,
    { required: false },
  )
  public generalUrbanRetirementDenialCompleteAnalysis?: GetGeneralUrbanRetirementDenialCompleteAnalysisResponseDto;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialCurrentResultResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialDocumentTypeEnum)
  public type: GeneralUrbanRetirementDenialDocumentTypeEnum;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialDocumentResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialPeriodWorkTypeEnum)
  public workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialPeriodCategoryEnum, {
    required: false,
  })
  public category?: GeneralUrbanRetirementDenialPeriodCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    GeneralUrbanRetirementDenialPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: GeneralUrbanRetirementDenialPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public shouldConsiderLastRemunerationAsExitDate: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementDenialPeriodDocumentResponseDto,
    { isArray: true, required: false },
  )
  public generalUrbanRetirementDenialPeriodDocument?: GetGeneralUrbanRetirementDenialPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementDenialPeriodEarningsHistoryResponseDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: GetGeneralUrbanRetirementDenialPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialPeriodResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementDenialResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementDenialId)
  public generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public denialDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public requestedBenefitType?: string;

  @ResponseDtoEnumProperty(GeneralUrbanRetirementDenialCategoryEnum, {
    required: false,
  })
  public category?: GeneralUrbanRetirementDenialCategoryEnum;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementDenialCurrentResultResponseDto,
    { required: false },
  )
  public generalUrbanRetirementDenialResult?: GetGeneralUrbanRetirementDenialCurrentResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementDenialDocumentResponseDto,
    { isArray: true, required: false },
  )
  public generalUrbanRetirementDenialDocument?: GetGeneralUrbanRetirementDenialDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementDenialPeriodResponseDto,
    { isArray: true, required: false },
  )
  public generalUrbanRetirementDenialPeriod?: GetGeneralUrbanRetirementDenialPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementDenialTimeAcceleratorResponseDto,
    { isArray: true, required: false },
  )
  public generalUrbanRetirementDenialTimeAccelerator?: GetGeneralUrbanRetirementDenialTimeAcceleratorResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialResponseDto.name;
}
