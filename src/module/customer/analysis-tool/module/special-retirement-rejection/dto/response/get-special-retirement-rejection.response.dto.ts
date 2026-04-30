import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { SpecialRetirementRejectionCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-category.enum';
import { SpecialRetirementRejectionHarmfulAgentEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-harmful-agent.enum';
import { SpecialRetirementRejectionRejectionReasonEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/enum/special-retirement-rejection-rejection-reason.enum';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/enum/special-retirement-rejection-document-type.enum';
import { SpecialRetirementRejectionWorkPeriodActivityTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-activity-type.enum';
import { SpecialRetirementRejectionWorkPeriodCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-category.enum';
import { SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-period-consideration.enum';
import { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import { SpecialRetirementRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/enum/special-retirement-rejection-work-period-document-type.enum';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/value-object/special-retirement-rejection-work-period-earnings-history-id.value-object';
import { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';
import { SpecialRetirementRejectionCompleteAnalysisModel } from '@module/customer/analysis-tool/module/special-retirement-rejection/model/special-retirement-rejection-complete-analysis.model';
import { SpecialRetirementRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/special-retirement-rejection/model/special-retirement-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSpecialRetirementRejectionClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @ResponseDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: PhoneNumber;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @ResponseDtoEnumProperty(AnalysisToolClientTypeEnum, { required: false })
  public clientType?: AnalysisToolClientTypeEnum;

  protected override readonly _type =
    GetSpecialRetirementRejectionClientResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64)
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(SpecialRetirementRejectionDocumentTypeEnum)
  public type: SpecialRetirementRejectionDocumentTypeEnum;

  protected override readonly _type =
    GetSpecialRetirementRejectionDocumentResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public benefitNumber: string;

  protected override readonly _type =
    GetSpecialRetirementRejectionInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public number: string;

  protected override readonly _type =
    GetSpecialRetirementRejectionLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionWorkPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64)
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(SpecialRetirementRejectionWorkPeriodDocumentTypeEnum)
  public type: SpecialRetirementRejectionWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    GetSpecialRetirementRejectionWorkPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionWorkPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SpecialRetirementRejectionWorkPeriodEarningsHistoryId,
  )
  public specialRetirementRejectionWorkPeriodEarningsHistoryId: SpecialRetirementRejectionWorkPeriodEarningsHistoryId;

  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public remuneration?: DecimalValue;

  @ResponseDtoStringProperty({ required: false })
  public indicators?: string;

  @ResponseDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contribution?: DecimalValue;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionSalary?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    GetSpecialRetirementRejectionWorkPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public code?: string;

  @ResponseDtoStringProperty({ required: false })
  public description?: string;

  protected override readonly _type =
    GetSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionWorkSpecialPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementRejectionWorkSpecialPeriodId)
  public specialRetirementRejectionWorkSpecialPeriodId: SpecialRetirementRejectionWorkSpecialPeriodId;

  @ResponseDtoBooleanProperty({ required: false })
  public recognizedSpecialTime?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public companyName?: string;

  @ResponseDtoStringProperty({ required: false })
  public cnpj?: string;

  @ResponseDtoStringProperty({ required: false })
  public position?: string;

  @ResponseDtoStringProperty({ required: false })
  public comprobatoryDocument?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public linkedToCnis?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public containsCnisRemunerationInPeriod?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public technicalJustification?: string;

  @ResponseDtoStringProperty({ required: false })
  public additionalObservation?: string;

  @ResponseDtoStringProperty({ required: false })
  public lawyerObservation?: string;

  @ResponseDtoStringProperty({ required: false })
  public exposureFrequency?: string;

  @ResponseDtoStringProperty({ required: false })
  public informationSource?: string;

  @ResponseDtoStringProperty({ required: false })
  public identifiedAgents?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public efficientEpi?: boolean;

  @ResponseDtoObjectProperty(
    () =>
      GetSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkResponseDto,
    { required: false, isArray: true },
  )
  public legalFrameworks?: GetSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkResponseDto[];

  protected override readonly _type =
    GetSpecialRetirementRejectionWorkSpecialPeriodResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionWorkPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementRejectionWorkPeriodId)
  public specialRetirementRejectionWorkPeriodId: SpecialRetirementRejectionWorkPeriodId;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(SpecialRetirementRejectionWorkPeriodCategoryEnum, {
    required: false,
  })
  public category?: SpecialRetirementRejectionWorkPeriodCategoryEnum;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public pendencyReason?: string[];

  @ResponseDtoEnumProperty(
    SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @ResponseDtoStringProperty({ required: false })
  public status?: string;

  @ResponseDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @ResponseDtoEnumProperty(
    SpecialRetirementRejectionWorkPeriodActivityTypeEnum,
    { required: false },
  )
  public activityType?: SpecialRetirementRejectionWorkPeriodActivityTypeEnum;

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionWorkPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetSpecialRetirementRejectionWorkPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionWorkPeriodEarningsHistoryResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetSpecialRetirementRejectionWorkPeriodEarningsHistoryResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionWorkSpecialPeriodResponseDto,
    { required: false, isArray: true },
  )
  public specialPeriods?: GetSpecialRetirementRejectionWorkSpecialPeriodResponseDto[];

  protected override readonly _type =
    GetSpecialRetirementRejectionWorkPeriodResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialRetirementRejectionFirstAnalysisModel,
    {
      required: false,
    },
  )
  public specialRetirementRejectionFirstAnalysis?: SpecialRetirementRejectionFirstAnalysisModel;

  @ResponseDtoObjectProperty(
    () => SpecialRetirementRejectionCompleteAnalysisModel,
    { required: false },
  )
  public specialRetirementRejectionCompleteAnalysis?: SpecialRetirementRejectionCompleteAnalysisModel;

  @ResponseDtoStringProperty({ required: false })
  public specialRetirementRejectionSimplifiedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementRejectionId)
  public specialRetirementRejectionId: SpecialRetirementRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(SpecialRetirementRejectionCategoryEnum, {
    required: false,
  })
  public category?: SpecialRetirementRejectionCategoryEnum;

  @ResponseDtoDateProperty({ required: false })
  public requirementStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public rejectionDate?: Date;

  @ResponseDtoEnumProperty(SpecialRetirementRejectionHarmfulAgentEnum, {
    required: false,
    isArray: true,
  })
  public harmfulAgents?: SpecialRetirementRejectionHarmfulAgentEnum[];

  @ResponseDtoStringProperty({ required: false })
  public otherAgents?: string;

  @ResponseDtoEnumProperty(SpecialRetirementRejectionRejectionReasonEnum, {
    required: false,
  })
  public rejectionReason?: SpecialRetirementRejectionRejectionReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public otherRejectionReason?: string;

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionInssBenefitResponseDto,
    { required: false, isArray: true },
  )
  public inssBenefits?: GetSpecialRetirementRejectionInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionLegalProceedingResponseDto,
    { required: false, isArray: true },
  )
  public legalProceedings?: GetSpecialRetirementRejectionLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetSpecialRetirementRejectionDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionWorkPeriodResponseDto,
    { required: false, isArray: true },
  )
  public workPeriods?: GetSpecialRetirementRejectionWorkPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionResultResponseDto,
    { required: false },
  )
  public specialRetirementRejectionResult?: GetSpecialRetirementRejectionResultResponseDto;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementRejectionClientResponseDto,
  )
  public analysisToolClient: GetSpecialRetirementRejectionClientResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementRejectionResponseDto.name;
}
