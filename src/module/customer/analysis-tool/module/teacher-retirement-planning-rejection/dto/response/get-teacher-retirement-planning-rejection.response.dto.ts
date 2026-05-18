import { TeacherRetirementPlanningRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-activity-type.enum';
import { TeacherRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-category.enum';
import { TeacherRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-denial-reason.enum';
import { TeacherRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/enum/teacher-retirement-planning-rejection-document-type.enum';
import { TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-education-level.enum';
import { TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-establishment-type.enum';
import { TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-function-performed.enum';
import { TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-analysis-type.enum';
import { TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import { TeacherRetirementPlanningRejectionViabilityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-viability.enum';
import { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public analysisToolClientId: string;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public federalDocument?: string;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public email?: string;

  @ResponseDtoStringProperty({ required: false })
  public sex?: string;

  @ResponseDtoStringProperty({ required: false })
  public phone?: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public firstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysisDownload?: string;

  @ResponseDtoStringProperty({ required: false })
  public simplifiedAnalysis?: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningRejectionDocumentTypeEnum)
  public type: TeacherRetirementPlanningRejectionDocumentTypeEnum;

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionDocumentResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public inssBenefit: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionTeachingPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public fileName: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionTeachingPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionTeachingPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public institutionName?: string;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum,
    { required: false },
  )
  public establishmentType?: TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum,
    { required: false },
  )
  public educationLevel?: TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum,
    { required: false },
  )
  public functionPerformed?: TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum;

  @ResponseDtoStringProperty({ required: false })
  public rejectionReason?: string;

  @ResponseDtoStringProperty({ required: false })
  public legalBasisForRecognition?: string;

  @ResponseDtoStringProperty({ required: false })
  public favorableJurisprudence?: string;

  @ResponseDtoStringProperty({ required: false })
  public proofStrategy?: string;

  @ResponseDtoObjectProperty(
    () =>
      GetTeacherRetirementPlanningRejectionTeachingPeriodDocumentResponseDto,
    { isArray: true },
  )
  public documents: GetTeacherRetirementPlanningRejectionTeachingPeriodDocumentResponseDto[];

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionTeachingPeriodResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty({ required: false })
  public competence?: string;

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
    GetTeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionWorkPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public fileName: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionWorkPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionWorkPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

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

  @ResponseDtoStringProperty({ required: false })
  public impactMonths?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasSpecialPeriod?: boolean;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum,
    { required: false },
  )
  public timelineClassification?: TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum;

  @ResponseDtoObjectProperty(
    () =>
      GetTeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryResponseDto,
    { isArray: true },
  )
  public earningsHistory: GetTeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRejectionWorkPeriodDocumentResponseDto,
    { isArray: true },
  )
  public documents: GetTeacherRetirementPlanningRejectionWorkPeriodDocumentResponseDto[];

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionWorkPeriodResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum,
    { required: false },
  )
  public timeType?: TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum,
    { required: false },
  )
  public recognitionInss?: TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum;

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

  @ResponseDtoEnumProperty(TeacherRetirementPlanningRejectionViabilityEnum, {
    required: false,
  })
  public viability?: TeacherRetirementPlanningRejectionViabilityEnum;

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public denialDate?: Date;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningRejectionCategoryEnum, {
    required: false,
  })
  public category?: TeacherRetirementPlanningRejectionCategoryEnum;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningRejectionActivityTypeEnum, {
    required: false,
  })
  public activityType?: TeacherRetirementPlanningRejectionActivityTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityTypeDescription?: string;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningRejectionDenialReasonEnum, {
    required: false,
  })
  public denialReason?: TeacherRetirementPlanningRejectionDenialReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public denialReasonDescription?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRejectionResultResponseDto,
    { required: false },
  )
  public result?: GetTeacherRetirementPlanningRejectionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRejectionAnalysisToolClientResponseDto,
    { required: false },
  )
  public analysisToolClient?: GetTeacherRetirementPlanningRejectionAnalysisToolClientResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRejectionDocumentResponseDto,
    { isArray: true },
  )
  public documents: GetTeacherRetirementPlanningRejectionDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRejectionInssBenefitResponseDto,
    { isArray: true },
  )
  public inssBenefits: GetTeacherRetirementPlanningRejectionInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRejectionTeachingPeriodResponseDto,
    { isArray: true },
  )
  public teachingPeriods: GetTeacherRetirementPlanningRejectionTeachingPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRejectionWorkPeriodResponseDto,
    { isArray: true },
  )
  public workPeriods: GetTeacherRetirementPlanningRejectionWorkPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto,
    { isArray: true },
  )
  public timeAccelerators: GetTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto[];

  protected override readonly _type =
    GetTeacherRetirementPlanningRejectionResponseDto.name;
}
