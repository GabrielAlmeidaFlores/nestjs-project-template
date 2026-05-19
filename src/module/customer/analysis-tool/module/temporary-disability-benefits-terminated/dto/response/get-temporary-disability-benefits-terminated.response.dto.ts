import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/enum/temporary-disability-benefits-terminated-severe-disease.enum';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/enum/temporary-disability-benefits-terminated-disability-analysis-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/enum/temporary-disability-benefits-terminated-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/enum/temporary-disability-benefits-terminated-previous-benefit-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/enum/temporary-disability-benefits-terminated-work-period-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-period-consideration.enum';
import { TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/generic/temporary-disability-benefits-terminated-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { TemporaryDisabilityBenefitsTerminatedResultInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/model/interface/temporary-disability-benefits-terminated-result.interface';

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
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
    GetTemporaryDisabilityBenefitsTerminatedAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel,
    { required: false },
  )
  public temporaryDisabilityBenefitsTerminatedFirstAnalysis?: TemporaryDisabilityBenefitsTerminatedFirstAnalysisModel;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public temporaryDisabilityBenefitsTerminatedCompleteAnalysis?: TemporaryDisabilityBenefitsTerminatedResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public temporaryDisabilityBenefitsTerminatedSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public temporaryDisabilityBenefitsTerminatedCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedResultResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public cidTenId: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public benefitNumber: string;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentResponseDto[];

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto extends BaseBuildableDtoObject {
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
    TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum,
    { required: false },
  )
  public severeDisease?: TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum;

  @ResponseDtoStringProperty({ required: false })
  public diseaseCustomName?: string;

  @ResponseDtoDateProperty({ required: false })
  public diseaseStartDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public needsConstantAssistanceFromAnotherPerson?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public previousDisabilityBenefit?: boolean;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidResponseDto,
    { isArray: true, required: false },
  )
  public cids?: GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitResponseDto,
    { isArray: true, required: false },
  )
  public previousBenefits?: GetTemporaryDisabilityBenefitsTerminatedPreviousBenefitResponseDto[];

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto extends BaseBuildableDtoObject {
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
      GetTemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetTemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentResponseDto[];

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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
    GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum,
  )
  public type: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(TemporaryDisabilityBenefitsTerminatedCategoryEnum, {
    required: false,
  })
  public category?: TemporaryDisabilityBenefitsTerminatedCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoNumberProperty({ required: false })
  public impactMonths?: number;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public isManualPeriod?: boolean;

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryResponseDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsTerminatedResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryDisabilityBenefitsTerminatedId)
  public temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public benefitCessationDate?: Date;

  @ResponseDtoEnumProperty(TemporaryDisabilityBenefitsTerminatedCategoryEnum, {
    required: false,
  })
  public category?: TemporaryDisabilityBenefitsTerminatedCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public myInssPassword?: string;

  @ResponseDtoStringProperty({ required: false })
  public benefitCessationReason?: string;

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsTerminatedAnalysisToolClientResponseDto,
  )
  public analysisToolClient: GetTemporaryDisabilityBenefitsTerminatedAnalysisToolClientResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsTerminatedResultResponseDto,
    { required: false },
  )
  public temporaryDisabilityBenefitsTerminatedResult?: GetTemporaryDisabilityBenefitsTerminatedResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsTerminatedDocumentResponseDto,
    { isArray: true, required: false },
  )
  public temporaryDisabilityBenefitsTerminatedDocument?: GetTemporaryDisabilityBenefitsTerminatedDocumentResponseDto[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto,
    { isArray: true, required: false },
  )
  public temporaryDisabilityBenefitsTerminatedDisabilityAnalysis?: GetTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto,
    { isArray: true, required: false },
  )
  public temporaryDisabilityBenefitsTerminatedInsuredStatus?: GetTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto,
    { isArray: true, required: false },
  )
  public temporaryDisabilityBenefitsTerminatedWorkPeriods?: GetTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsTerminatedResponseDto.name;
}
