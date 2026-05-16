import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import { PermanentIncapacityBenefitTerminatedReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-reason.enum';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/enum/permanent-incapacity-benefit-terminated-severe-disease.enum';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/enum/permanent-incapacity-benefit-terminated-disability-analysis-document-type.enum';
import { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';
import { PermanentIncapacityBenefitTerminatedFirstAnalysisModel } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/generic/permanent-incapacity-benefit-terminated-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { PermanentIncapacityBenefitTerminatedResultInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/model/interface/permanent-incapacity-benefit-terminated-result.interface';

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
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
    GetPermanentIncapacityBenefitTerminatedAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => PermanentIncapacityBenefitTerminatedFirstAnalysisModel,
    { required: false },
  )
  public permanentIncapacityBenefitTerminatedFirstAnalysis?: PermanentIncapacityBenefitTerminatedFirstAnalysisModel;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public permanentIncapacityBenefitTerminatedCompleteAnalysis?: PermanentIncapacityBenefitTerminatedResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public permanentIncapacityBenefitTerminatedSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public permanentIncapacityBenefitTerminatedCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedResultResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(PermanentIncapacityBenefitTerminatedDocumentTypeEnum)
  public type: PermanentIncapacityBenefitTerminatedDocumentTypeEnum;

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedDocumentResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisCidResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public cidTenId: string;

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisCidResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum,
  )
  public type: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum;

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto extends BaseBuildableDtoObject {
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
    PermanentIncapacityBenefitTerminatedSevereDiseaseEnum,
    { required: false },
  )
  public severeDisease?: PermanentIncapacityBenefitTerminatedSevereDiseaseEnum;

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
      GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisCidResponseDto,
    { isArray: true, required: false },
  )
  public cids?: GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisCidResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentResponseDto[];

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedInsuredStatusDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedInsuredStatusDocumentResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedInsuredStatusResponseDto extends BaseBuildableDtoObject {
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
      GetPermanentIncapacityBenefitTerminatedInsuredStatusDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetPermanentIncapacityBenefitTerminatedInsuredStatusDocumentResponseDto[];

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedInsuredStatusResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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
    GetPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(PermanentIncapacityBenefitTerminatedCategoryEnum, {
    required: false,
  })
  public category?: PermanentIncapacityBenefitTerminatedCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(
    PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @ResponseDtoObjectProperty(
    () =>
      GetPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryResponseDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: GetPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto.name;
}

@ResponseDto()
export class GetPermanentIncapacityBenefitTerminatedResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PermanentIncapacityBenefitTerminatedId)
  public permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public benefitTerminationDate?: Date;

  @ResponseDtoEnumProperty(PermanentIncapacityBenefitTerminatedCategoryEnum, {
    required: false,
  })
  public category?: PermanentIncapacityBenefitTerminatedCategoryEnum;

  @ResponseDtoEnumProperty(PermanentIncapacityBenefitTerminatedReasonEnum, {
    required: false,
  })
  public terminationReason?: PermanentIncapacityBenefitTerminatedReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public terminationReasonDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetPermanentIncapacityBenefitTerminatedAnalysisToolClientResponseDto,
  )
  public analysisToolClient: GetPermanentIncapacityBenefitTerminatedAnalysisToolClientResponseDto;

  @ResponseDtoObjectProperty(
    () => GetPermanentIncapacityBenefitTerminatedResultResponseDto,
    { required: false },
  )
  public permanentIncapacityBenefitTerminatedResult?: GetPermanentIncapacityBenefitTerminatedResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetPermanentIncapacityBenefitTerminatedDocumentResponseDto,
    { isArray: true, required: false },
  )
  public permanentIncapacityBenefitTerminatedDocument?: GetPermanentIncapacityBenefitTerminatedDocumentResponseDto[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @ResponseDtoObjectProperty(
    () => GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto,
    { isArray: true, required: false },
  )
  public permanentIncapacityBenefitTerminatedDisabilityAnalysis?: GetPermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetPermanentIncapacityBenefitTerminatedInsuredStatusResponseDto,
    { isArray: true, required: false },
  )
  public permanentIncapacityBenefitTerminatedInsuredStatus?: GetPermanentIncapacityBenefitTerminatedInsuredStatusResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetPermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto,
    { isArray: true, required: false },
  )
  public permanentIncapacityBenefitTerminatedWorkPeriods?: GetPermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetPermanentIncapacityBenefitTerminatedResponseDto.name;
}
