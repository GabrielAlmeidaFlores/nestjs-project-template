import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRejectionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/enum/retirement-permanent-disability-rejection-category.enum';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/enum/retirement-permanent-disability-rejection-document-type.enum';
import { RetirementPermanentDisabilityRejectionSeriousDiseaseEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/enum/retirement-permanent-disability-rejection-serious-disease.enum';
import { RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/enum/retirement-permanent-disability-rejection-incapacity-cid-type.enum';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/enum/retirement-permanent-disability-rejection-incapacity-document-type.enum';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/enum/retirement-permanent-disability-rejection-insured-quality-document-type.enum';
import { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import { RetirementPermanentDisabilityRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-consideration.enum';
import { RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-pendency-reason.enum';
import { RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-work-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public firstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionDocumentTypeEnum,
  )
  public type: RetirementPermanentDisabilityRejectionDocumentTypeEnum;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionDocumentResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionIncapacityAuditCidResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public cid: string;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum,
  )
  public type: RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionIncapacityAuditCidResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionIncapacityDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum,
  )
  public type: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionIncapacityDocumentResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public benefitNumber: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionIncapacityResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public incapacityStartDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public diseaseDescription?: string;

  @ResponseDtoBooleanProperty()
  public isIncapacityFromAccident: boolean;

  @ResponseDtoStringProperty({ required: false })
  public incapacitatingEventDescription?: string;

  @ResponseDtoBooleanProperty()
  public isIncapacityFromSeriousDisease: boolean;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionSeriousDiseaseEnum,
    { required: false },
  )
  public seriousDiseaseType?: RetirementPermanentDisabilityRejectionSeriousDiseaseEnum;

  @ResponseDtoStringProperty({ required: false })
  public seriousDiseaseOtherDescription?: string;

  @ResponseDtoDateProperty({ required: false })
  public seriousDiseaseStartDate?: Date;

  @ResponseDtoBooleanProperty()
  public needsPermanentAssistance: boolean;

  @ResponseDtoBooleanProperty()
  public hasPreviousIncapacityBenefit: boolean;

  @ResponseDtoObjectProperty(
    () =>
      GetRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitResponseDto,
    { isArray: true, required: false },
  )
  public previousBenefits?: GetRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetRetirementPermanentDisabilityRejectionIncapacityAuditCidResponseDto,
    { isArray: true, required: false },
  )
  public cids?: GetRetirementPermanentDisabilityRejectionIncapacityAuditCidResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetRetirementPermanentDisabilityRejectionIncapacityDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetRetirementPermanentDisabilityRejectionIncapacityDocumentResponseDto[];

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionIncapacityResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionInsuredQualityDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum,
  )
  public type: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionInsuredQualityDocumentResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionInsuredQualityResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public isInvoluntaryUnemployed: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public intendsToProveInvoluntaryUnemployment?: boolean;

  @ResponseDtoBooleanProperty()
  public isRuralInsuredAtGeneratingFact: boolean;

  @ResponseDtoDateProperty({ required: false })
  public ruralInsuredStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public ruralInsuredEndDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public ruralInsuredDescription?: string;

  @ResponseDtoObjectProperty(
    () =>
      GetRetirementPermanentDisabilityRejectionInsuredQualityDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetRetirementPermanentDisabilityRejectionInsuredQualityDocumentResponseDto[];

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionInsuredQualityResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum,
  )
  public workType: RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodCategoryEnum,
    { required: false },
  )
  public category?: RetirementPermanentDisabilityRejectionPeriodCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRejectionPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: RetirementPermanentDisabilityRejectionPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoStringProperty({ required: false })
  public local?: string;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRejectionPeriodDocumentResponseDto,
    { isArray: true, required: false },
  )
  public retirementPermanentDisabilityRejectionPeriodDocument?: GetRetirementPermanentDisabilityRejectionPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetRetirementPermanentDisabilityRejectionPeriodEarningsHistoryResponseDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: GetRetirementPermanentDisabilityRejectionPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionPeriodResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPermanentDisabilityRejectionId)
  public retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public denialDate?: Date;

  @ResponseDtoEnumProperty(RetirementPermanentDisabilityRejectionCategoryEnum, {
    required: false,
  })
  public category?: RetirementPermanentDisabilityRejectionCategoryEnum;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRejectionResultResponseDto,
    { required: false },
  )
  public retirementPermanentDisabilityRejectionResult?: GetRetirementPermanentDisabilityRejectionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRejectionDocumentResponseDto,
    { isArray: true, required: false },
  )
  public retirementPermanentDisabilityRejectionDocument?: GetRetirementPermanentDisabilityRejectionDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRejectionIncapacityResponseDto,
    { required: false },
  )
  public retirementPermanentDisabilityRejectionIncapacity?: GetRetirementPermanentDisabilityRejectionIncapacityResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRejectionInsuredQualityResponseDto,
    { required: false },
  )
  public retirementPermanentDisabilityRejectionInsuredQuality?: GetRetirementPermanentDisabilityRejectionInsuredQualityResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRejectionPeriodResponseDto,
    { isArray: true, required: false },
  )
  public retirementPermanentDisabilityRejectionPeriod?: GetRetirementPermanentDisabilityRejectionPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionResponseDto.name;
}
