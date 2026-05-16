import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import { TemporaryIncapacityBenefitRejectionConditionEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-condition.enum';
import { TemporaryIncapacityBenefitRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-denial-reason.enum';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/enum/temporary-incapacity-benefit-rejection-severe-disease.enum';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/enum/temporary-incapacity-benefit-rejection-disability-analysis-document-type.enum';
import { TemporaryIncapacityBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/enum/temporary-incapacity-benefit-rejection-document-type.enum';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-period-consideration.enum';
import { TemporaryIncapacityBenefitRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/generic/temporary-incapacity-benefit-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { TemporaryIncapacityBenefitRejectionResultInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/model/interface/temporary-incapacity-benefit-rejection-result.interface';

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public corporateEmail?: Email;

  @ResponseDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: PhoneNumber;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @ResponseDtoEnumProperty(AnalysisToolClientTypeEnum, { required: false })
  public clientType?: AnalysisToolClientTypeEnum;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => TemporaryIncapacityBenefitRejectionFirstAnalysisModel,
    { required: false },
  )
  public temporaryIncapacityBenefitRejectionFirstAnalysis?: TemporaryIncapacityBenefitRejectionFirstAnalysisModel;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public temporaryIncapacityBenefitRejectionCompleteAnalysis?: TemporaryIncapacityBenefitRejectionResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public temporaryIncapacityBenefitRejectionSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public temporaryIncapacityBenefitRejectionCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitRejectionDocumentTypeEnum)
  public type: TemporaryIncapacityBenefitRejectionDocumentTypeEnum;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisCidResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public cidTenId: string;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisCidResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum,
  )
  public type: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public estimatedDisabilityStartDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public shortDisabilityDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public disabilityFromAccident?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public disablingConditionDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public disabilityFromSevereDisease?: boolean;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionSevereDiseaseEnum,
    { required: false },
  )
  public severeDisease?: TemporaryIncapacityBenefitRejectionSevereDiseaseEnum;

  @ResponseDtoStringProperty({ required: false })
  public diseaseCustomName?: string;

  @ResponseDtoDateProperty({ required: false })
  public diseaseStartDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public needsConstantAssistanceFromAnotherPerson?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public previousDisabilityBenefit?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public previousBenefitNumber?: string;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisCidResponseDto,
    { isArray: true, required: false },
  )
  public cids?: GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisCidResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentResponseDto[];

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionInsuredStatusDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionInsuredStatusDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty({ required: false })
  public involuntaryUnemployment?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public intentionToProveInvoluntaryUnemployment?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public ruralInsuredClient?: boolean;

  @ResponseDtoDateProperty({ required: false })
  public ruralPeriodStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public ruralPeriodEndDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public documentsDescription?: string;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryIncapacityBenefitRejectionInsuredStatusDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetTemporaryIncapacityBenefitRejectionInsuredStatusDocumentResponseDto[];

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public remuneration?: string;

  @ResponseDtoStringProperty({ required: false })
  public indicators?: string;

  @ResponseDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public contribution?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitRejectionCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryResponseDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: GetTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto.name;
}

@ResponseDto()
export class GetTemporaryIncapacityBenefitRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryIncapacityBenefitRejectionId)
  public temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public denialDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public requestedBenefitType?: string;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: TemporaryIncapacityBenefitRejectionCategoryEnum;

  @ResponseDtoEnumProperty(
    TemporaryIncapacityBenefitRejectionDenialReasonEnum,
    {
      required: false,
    },
  )
  public denialReason?: TemporaryIncapacityBenefitRejectionDenialReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public denialReasonDescription?: string;

  @ResponseDtoEnumProperty(TemporaryIncapacityBenefitRejectionConditionEnum, {
    required: false,
  })
  public condition?: TemporaryIncapacityBenefitRejectionConditionEnum;

  @ResponseDtoStringProperty({ required: false })
  public conditionDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitRejectionAnalysisToolClientResponseDto,
    { required: false },
  )
  public analysisToolClient?: GetTemporaryIncapacityBenefitRejectionAnalysisToolClientResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitRejectionResultResponseDto,
    { required: false },
  )
  public temporaryIncapacityBenefitRejectionResult?: GetTemporaryIncapacityBenefitRejectionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitRejectionDocumentResponseDto,
    { isArray: true, required: false },
  )
  public temporaryIncapacityBenefitRejectionDocument?: GetTemporaryIncapacityBenefitRejectionDocumentResponseDto[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto,
    { isArray: true, required: false },
  )
  public temporaryIncapacityBenefitRejectionDisabilityAnalysis?: GetTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto,
    { isArray: true, required: false },
  )
  public temporaryIncapacityBenefitRejectionInsuredStatus?: GetTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto,
    { isArray: true, required: false },
  )
  public temporaryIncapacityBenefitRejectionWorkPeriods?: GetTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetTemporaryIncapacityBenefitRejectionResponseDto.name;
}
