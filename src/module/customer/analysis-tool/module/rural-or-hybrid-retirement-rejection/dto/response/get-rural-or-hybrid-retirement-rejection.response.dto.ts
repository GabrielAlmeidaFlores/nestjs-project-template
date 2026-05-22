import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/enum/rural-or-hybrid-retirement-rejection-document-type.enum';
import { RuralOrHybridRetirementRejectionProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-production-destination.enum';
import { RuralOrHybridRetirementRejectionWorkScheduleEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-work-schedule.enum';
import { RuralOrHybridRetirementRejectionWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/enum/rural-or-hybrid-retirement-rejection-worker-type.enum';
import { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import { RuralOrHybridRetirementRejectionKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/enum/rural-or-hybrid-retirement-rejection-kinship.enum';
import { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';
import { RuralOrHybridRetirementRejectionInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/enum/rural-or-hybrid-retirement-rejection-insured-relationship.enum';
import { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';
import { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';
import { RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-recognition-inss.enum';
import { RuralOrHybridRetirementRejectionViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-viability.enum';
import { RuralOrHybridRetirementRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/value-object/rural-or-hybrid-retirement-rejection-time-accelerator-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/enum/rural-or-hybrid-retirement-rejection-work-period-job-type.enum';
import { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import { RuralOrHybridRetirementRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-first-analysis.interface';
import { RuralOrHybridRetirementRejectionResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-result.interface';
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
export class GetRuralOrHybridRetirementRejectionInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public inssBenefit: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public ruralOrHybridRetirementRejectionCompleteAnalysis?: RuralOrHybridRetirementRejectionResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public ruralOrHybridRetirementRejectionSimplifiedAnalysis?: string;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public ruralOrHybridRetirementRejectionFirstAnalysis?: RuralOrHybridRetirementRejectionFirstAnalysisInterface;

  @ResponseDtoStringProperty({ required: false })
  public ruralOrHybridRetirementRejectionCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, { description: 'Arquivo em Base64' })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    required: false,
    description: 'Arquivo em Base64',
  })
  public document?: Base64;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionDocumentTypeEnum, {
    required: false,
  })
  public type?: RuralOrHybridRetirementRejectionDocumentTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public originalFileName?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    required: false,
    description: 'Arquivo em Base64',
  })
  public document?: Base64;

  @ResponseDtoStringProperty({ required: false })
  public type?: string;

  @ResponseDtoStringProperty({ required: false })
  public originalFileName?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionPeriodMemberDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    required: false,
    description: 'Arquivo em Base64',
  })
  public document?: Base64;

  @ResponseDtoStringProperty({ required: false })
  public type?: string;

  @ResponseDtoStringProperty({ required: false })
  public originalFileName?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionPeriodMemberDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionPeriodMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralOrHybridRetirementRejectionPeriodMemberId,
  )
  public ruralOrHybridRetirementRejectionPeriodMemberId: RuralOrHybridRetirementRejectionPeriodMemberId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public federalDocument?: string;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionKinshipEnum, {
    required: false,
  })
  public kinship?: RuralOrHybridRetirementRejectionKinshipEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public hasReceivedRuralBenefit?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public benefitNumber?: string;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionPeriodMemberDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRuralOrHybridRetirementRejectionPeriodMemberDocumentResponseDto[];

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionPeriodMemberResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionPeriodId)
  public ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionWorkerTypeEnum, {
    required: false,
  })
  public workerType?: RuralOrHybridRetirementRejectionWorkerTypeEnum;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionWorkScheduleEnum, {
    required: false,
  })
  public workSchedule?: RuralOrHybridRetirementRejectionWorkScheduleEnum;

  @ResponseDtoStringProperty({ required: false })
  public propertyName?: string;

  @ResponseDtoStringProperty({ required: false })
  public propertyCategory?: string;

  @ResponseDtoStringProperty({ required: false })
  public propertyOwner?: string;

  @ResponseDtoStringProperty({ required: false })
  public propertyCep?: string;

  @ResponseDtoEnumProperty(StateCodeEnum, { required: false })
  public propertyState?: StateCodeEnum;

  @ResponseDtoStringProperty({ required: false })
  public propertyCity?: string;

  @ResponseDtoStringProperty({ required: false })
  public propertyNeighbourhood?: string;

  @ResponseDtoStringProperty({ required: false })
  public propertyStreet?: string;

  @ResponseDtoStringProperty({ required: false })
  public propertyNumber?: string;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementRejectionProductionDestinationEnum,
    { required: false },
  )
  public productionDestination?: RuralOrHybridRetirementRejectionProductionDestinationEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public employee?: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public employeeAmount?: number;

  @ResponseDtoBooleanProperty({ required: false })
  public agriculturalMachinery?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public agriculturalMachineryDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public farmVehicles?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public farmVehiclesDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public incomeBesidesRuralProduction?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public incomeBesidesRuralProductionDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public clientHasOrHadCnpj?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public clientHasOrHadCnpjDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public clientLivesInUrbanArea?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public clientMunicipality?: string;

  @ResponseDtoEnumProperty(StateCodeEnum, { required: false })
  public clientState?: StateCodeEnum;

  @ResponseDtoStringProperty({ required: false })
  public distance?: string;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRuralOrHybridRetirementRejectionPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionPeriodMemberResponseDto,
    { required: false, isArray: true },
  )
  public members?: GetRuralOrHybridRetirementRejectionPeriodMemberResponseDto[];

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionPeriodResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionTestimonialWitnessDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    required: false,
    description: 'Arquivo em Base64',
  })
  public document?: Base64;

  @ResponseDtoStringProperty({ required: false })
  public originalFileName?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionTestimonialWitnessDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralOrHybridRetirementRejectionTestimonialWitnessId,
  )
  public ruralOrHybridRetirementRejectionTestimonialWitnessId: RuralOrHybridRetirementRejectionTestimonialWitnessId;

  @ResponseDtoStringProperty({ required: false })
  public fullName?: string;

  @ResponseDtoStringProperty({ required: false })
  public federalDocument?: string;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementRejectionInsuredRelationshipEnum,
    { required: false },
  )
  public insuredRelationship?: RuralOrHybridRetirementRejectionInsuredRelationshipEnum;

  @ResponseDtoDateProperty({ required: false })
  public canTestifyStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public canTestifyEndDate?: Date;

  @ResponseDtoObjectProperty(
    () =>
      GetRuralOrHybridRetirementRejectionTestimonialWitnessDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRuralOrHybridRetirementRejectionTestimonialWitnessDocumentResponseDto[];

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public documentType?: string;

  @ResponseDtoStringProperty({ required: false })
  public ownName?: string;

  @ResponseDtoNumberProperty({ required: false })
  public documentYear?: number;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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
  public competenceBelowMinimum?: boolean;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionWorkPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    required: false,
    description: 'Arquivo em Base64',
  })
  public document?: Base64;

  @ResponseDtoStringProperty({ required: false })
  public type?: string;

  @ResponseDtoStringProperty({ required: false })
  public originalFileName?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionWorkPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionWorkPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionWorkPeriodId)
  public ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public pendencyReason?: string;

  @ResponseDtoStringProperty({ required: false })
  public periodConsideration?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @ResponseDtoStringProperty({ required: false })
  public status?: string;

  @ResponseDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum,
    { required: false },
  )
  public jobType?: RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionWorkPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRuralOrHybridRetirementRejectionWorkPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto,
    { required: false, isArray: true },
  )
  public documentAnalyses?: GetRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetRuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetRuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionWorkPeriodResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralOrHybridRetirementRejectionTimeAcceleratorId,
  )
  public ruralOrHybridRetirementRejectionTimeAcceleratorId: RuralOrHybridRetirementRejectionTimeAcceleratorId;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum,
    { required: false },
  )
  public timeType?: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum,
    { required: false },
  )
  public recognitionInss?: RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public affectsQualifyingPeriod?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionViabilityEnum, {
    required: false,
  })
  public viability?: RuralOrHybridRetirementRejectionViabilityEnum;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
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
    GetRuralOrHybridRetirementRejectionAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementRejectionId)
  public ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionAnalysisToolClientResponseDto,
  )
  public analysisToolClient: GetRuralOrHybridRetirementRejectionAnalysisToolClientResponseDto;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementRejectionActivityTypeEnum, {
    required: false,
  })
  public activityType?: RuralOrHybridRetirementRejectionActivityTypeEnum;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementRejectionRequestedBenefitEnum,
    { required: false },
  )
  public requestedBenefit?: RuralOrHybridRetirementRejectionRequestedBenefitEnum;

  @ResponseDtoDateProperty({ required: false })
  public applicationSubmissionDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public dateOfRejection?: Date;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionCnisDocumentResponseDto,
    { required: false },
  )
  public cnisDocument?: GetRuralOrHybridRetirementRejectionCnisDocumentResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionDocumentResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementRejectionDocument?: GetRuralOrHybridRetirementRejectionDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionResultResponseDto,
    { required: false },
  )
  public ruralOrHybridRetirementRejectionResult?: GetRuralOrHybridRetirementRejectionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionInssBenefitResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementRejectionInssBenefit?: GetRuralOrHybridRetirementRejectionInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionLegalProceedingResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementRejectionLegalProceeding?: GetRuralOrHybridRetirementRejectionLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionPeriodResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementRejectionPeriod?: GetRuralOrHybridRetirementRejectionPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementRejectionTestimonialWitness?: GetRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionWorkPeriodResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementRejectionWorkPeriod?: GetRuralOrHybridRetirementRejectionWorkPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementRejectionTimeAccelerator?: GetRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionResponseDto.name;
}
