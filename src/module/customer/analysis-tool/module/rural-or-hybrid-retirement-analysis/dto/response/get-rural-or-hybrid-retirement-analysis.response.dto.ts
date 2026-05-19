import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RuralOrHybridRetirementAnalysisActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-activity-type.enum';
import { RuralOrHybridRetirementAnalysisRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-requested-benefit.enum';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-production-destination.enum';
import { RuralOrHybridRetirementAnalysisWorkScheduleEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-work-schedule.enum';
import { RuralOrHybridRetirementAnalysisWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-worker-type.enum';
import { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';
import { RuralOrHybridRetirementAnalysisKinshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/enum/rural-or-hybrid-retirement-analysis-kinship.enum';
import { RuralOrHybridRetirementAnalysisPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/value-object/rural-or-hybrid-retirement-analysis-period-member-id.value-object';
import { RuralOrHybridRetirementAnalysisInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/enum/rural-or-hybrid-retirement-analysis-insured-relationship.enum';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-analysis-type.enum';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-recognition-inss.enum';
import { RuralOrHybridRetirementAnalysisViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-viability.enum';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/value-object/rural-or-hybrid-retirement-analysis-time-accelerator-id.value-object';
import { RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/enum/rural-or-hybrid-retirement-analysis-work-period-job-type.enum';
import { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import { RuralOrHybridRetirementAnalysisFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-first-analysis.interface';
import { RuralOrHybridRetirementAnalysisResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-result.interface';
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
export class GetRuralOrHybridRetirementAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public ruralOrHybridRetirementAnalysisCompleteAnalysis?: RuralOrHybridRetirementAnalysisResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public ruralOrHybridRetirementAnalysisSimplifiedAnalysis?: string;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public ruralOrHybridRetirementAnalysisFirstAnalysis?: RuralOrHybridRetirementAnalysisFirstAnalysisInterface;

  @ResponseDtoStringProperty({ required: false })
  public ruralOrHybridRetirementAnalysisCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, { description: 'Arquivo em Base64' })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisPeriodDocumentResponseDto extends BaseBuildableDtoObject {
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
    GetRuralOrHybridRetirementAnalysisPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisPeriodMemberDocumentResponseDto extends BaseBuildableDtoObject {
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
    GetRuralOrHybridRetirementAnalysisPeriodMemberDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisPeriodMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementAnalysisPeriodMemberId)
  public ruralOrHybridRetirementAnalysisPeriodMemberId: RuralOrHybridRetirementAnalysisPeriodMemberId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public federalDocument?: string;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementAnalysisKinshipEnum, {
    required: false,
  })
  public kinship?: RuralOrHybridRetirementAnalysisKinshipEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public hasReceivedRuralBenefit?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public benefitNumber?: string;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisPeriodMemberDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRuralOrHybridRetirementAnalysisPeriodMemberDocumentResponseDto[];

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisPeriodMemberResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementAnalysisPeriodId)
  public ruralOrHybridRetirementAnalysisPeriodId: RuralOrHybridRetirementAnalysisPeriodId;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementAnalysisWorkerTypeEnum, {
    required: false,
  })
  public workerType?: RuralOrHybridRetirementAnalysisWorkerTypeEnum;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementAnalysisWorkScheduleEnum, {
    required: false,
  })
  public workSchedule?: RuralOrHybridRetirementAnalysisWorkScheduleEnum;

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
    RuralOrHybridRetirementAnalysisProductionDestinationEnum,
    { required: false },
  )
  public productionDestination?: RuralOrHybridRetirementAnalysisProductionDestinationEnum;

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
    () => GetRuralOrHybridRetirementAnalysisPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRuralOrHybridRetirementAnalysisPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisPeriodMemberResponseDto,
    { required: false, isArray: true },
  )
  public members?: GetRuralOrHybridRetirementAnalysisPeriodMemberResponseDto[];

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisPeriodResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisTestimonialWitnessDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    required: false,
    description: 'Arquivo em Base64',
  })
  public document?: Base64;

  @ResponseDtoStringProperty({ required: false })
  public originalFileName?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisTestimonialWitnessDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralOrHybridRetirementAnalysisTestimonialWitnessId,
  )
  public ruralOrHybridRetirementAnalysisTestimonialWitnessId: RuralOrHybridRetirementAnalysisTestimonialWitnessId;

  @ResponseDtoStringProperty({ required: false })
  public fullName?: string;

  @ResponseDtoStringProperty({ required: false })
  public federalDocument?: string;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementAnalysisInsuredRelationshipEnum,
    { required: false },
  )
  public insuredRelationship?: RuralOrHybridRetirementAnalysisInsuredRelationshipEnum;

  @ResponseDtoDateProperty({ required: false })
  public canTestifyStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public canTestifyEndDate?: Date;

  @ResponseDtoObjectProperty(
    () =>
      GetRuralOrHybridRetirementAnalysisTestimonialWitnessDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRuralOrHybridRetirementAnalysisTestimonialWitnessDocumentResponseDto[];

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public documentType?: string;

  @ResponseDtoStringProperty({ required: false })
  public ownName?: string;

  @ResponseDtoNumberProperty({ required: false })
  public documentYear?: number;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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
    GetRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentResponseDto extends BaseBuildableDtoObject {
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
    GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisWorkPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementAnalysisWorkPeriodId)
  public ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId;

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
    RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum,
    { required: false },
  )
  public jobType?: RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResponseDto,
    { required: false, isArray: true },
  )
  public documentAnalyses?: GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisWorkPeriodResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RuralOrHybridRetirementAnalysisTimeAcceleratorId,
  )
  public ruralOrHybridRetirementAnalysisTimeAcceleratorId: RuralOrHybridRetirementAnalysisTimeAcceleratorId;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum,
    { required: false },
  )
  public timeType?: RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum,
    { required: false },
  )
  public recognitionInss?: RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum;

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

  @ResponseDtoEnumProperty(RuralOrHybridRetirementAnalysisViabilityEnum, {
    required: false,
  })
  public viability?: RuralOrHybridRetirementAnalysisViabilityEnum;

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
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
    GetRuralOrHybridRetirementAnalysisAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetRuralOrHybridRetirementAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralOrHybridRetirementAnalysisId)
  public ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisAnalysisToolClientResponseDto,
  )
  public analysisToolClient: GetRuralOrHybridRetirementAnalysisAnalysisToolClientResponseDto;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(RuralOrHybridRetirementAnalysisActivityTypeEnum, {
    required: false,
  })
  public activityType?: RuralOrHybridRetirementAnalysisActivityTypeEnum;

  @ResponseDtoEnumProperty(
    RuralOrHybridRetirementAnalysisRequestedBenefitEnum,
    { required: false },
  )
  public requestedBenefit?: RuralOrHybridRetirementAnalysisRequestedBenefitEnum;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisCnisDocumentResponseDto,
    { required: false },
  )
  public cnisDocument?: GetRuralOrHybridRetirementAnalysisCnisDocumentResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisResultResponseDto,
    { required: false },
  )
  public ruralOrHybridRetirementAnalysisResult?: GetRuralOrHybridRetirementAnalysisResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisPeriodResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementAnalysisPeriod?: GetRuralOrHybridRetirementAnalysisPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementAnalysisTestimonialWitness?: GetRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisWorkPeriodResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementAnalysisWorkPeriod?: GetRuralOrHybridRetirementAnalysisWorkPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto,
    { required: false, isArray: true },
  )
  public ruralOrHybridRetirementAnalysisTimeAccelerator?: GetRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisResponseDto.name;
}
