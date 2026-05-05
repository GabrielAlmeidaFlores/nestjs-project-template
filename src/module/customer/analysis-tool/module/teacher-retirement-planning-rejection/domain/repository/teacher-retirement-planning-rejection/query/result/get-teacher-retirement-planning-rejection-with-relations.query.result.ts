import type { TeacherRetirementPlanningRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-activity-type.enum';
import type { TeacherRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-category.enum';
import type { TeacherRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-denial-reason.enum';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/enum/teacher-retirement-planning-rejection-document-type.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-education-level.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-establishment-type.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-function-performed.enum';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-analysis-type.enum';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import type { TeacherRetirementPlanningRejectionViabilityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-viability.enum';
import type { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';

export class GetTeacherRetirementPlanningRejectionWithRelationsQueryResult {
  public readonly id: TeacherRetirementPlanningRejectionId;
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly category: TeacherRetirementPlanningRejectionCategoryEnum | null;
  public readonly activityType: TeacherRetirementPlanningRejectionActivityTypeEnum | null;
  public readonly activityTypeDescription: string | null;
  public readonly denialReason: TeacherRetirementPlanningRejectionDenialReasonEnum | null;
  public readonly denialReasonDescription: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public readonly result: {
    id: string;
    inssDecisionAnalysis: string | null;
    firstAnalysis: string | null;
    completeAnalysis: string | null;
    completeAnalysisDownload: string | null;
    simplifiedAnalysis: string | null;
  } | null;

  public readonly documents: Array<{
    id: string;
    fileName: string;
    name: string;
    type: TeacherRetirementPlanningRejectionDocumentTypeEnum;
  }>;

  public readonly inssBenefits: Array<{
    id: string;
    inssBenefit: string;
  }>;

  public readonly teachingPeriods: Array<{
    id: string;
    startDate: Date | null;
    endDate: Date | null;
    institutionName: string | null;
    establishmentType: TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum | null;
    educationLevel: TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum | null;
    functionPerformed: TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum | null;
    rejectionReason: string | null;
    legalBasisForRecognition: string | null;
    favorableJurisprudence: string | null;
    proofStrategy: string | null;
    documents: Array<{
      id: string;
      fileName: string;
    }>;
  }>;

  public readonly workPeriods: Array<{
    id: string;
    bondOrigin: string | null;
    startDate: Date | null;
    endDate: Date | null;
    category: string | null;
    activityDescription: string | null;
    competenceBelowTheMinimum: boolean | null;
    pendencyReason: string | null;
    periodConsideration: string | null;
    contributionAverage: string | null;
    status: string | null;
    gracePeriod: string | null;
    impactMonths: string | null;
    isPendency: boolean | null;
    wantsToComplementViaMeuINSS: boolean | null;
    hasSpecialPeriod: boolean | null;
    timelineClassification: TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum | null;
    earningsHistory: Array<{
      id: string;
      competence: string | null;
      remuneration: string | null;
      indicators: string | null;
      paymentDate: Date | null;
      contribution: string | null;
      contributionSalary: string | null;
      competenceBelowMinimum: boolean | null;
    }>;
    documents: Array<{
      id: string;
      fileName: string;
    }>;
  }>;

  public readonly timeAccelerators: Array<{
    id: string;
    timeType: TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum | null;
    institution: string | null;
    recognitionInss: TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum | null;
    affectsQualifyingPeriod: boolean | null;
    technicalNote: string | null;
    startDate: Date | null;
    endDate: Date | null;
    gracePeriod: string | null;
    viability: TeacherRetirementPlanningRejectionViabilityEnum | null;
  }>;

  public readonly analysisToolClient: {
    analysisToolClientId: string;
    name: string | null;
    federalDocument: string | null;
    birthDate: Date | null;
    email: string | null;
    sex: string | null;
    phone: string | null;
  };

  protected readonly _type =
    GetTeacherRetirementPlanningRejectionWithRelationsQueryResult.name;

  public constructor(
    props: GetTeacherRetirementPlanningRejectionWithRelationsQueryResult,
  ) {
    this.id = props.id;
    this.analysisName = props.analysisName;
    this.requestEntryDate = props.requestEntryDate;
    this.denialDate = props.denialDate;
    this.category = props.category;
    this.activityType = props.activityType;
    this.activityTypeDescription = props.activityTypeDescription;
    this.denialReason = props.denialReason;
    this.denialReasonDescription = props.denialReasonDescription;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.result = props.result;
    this.documents = props.documents;
    this.inssBenefits = props.inssBenefits;
    this.teachingPeriods = props.teachingPeriods;
    this.workPeriods = props.workPeriods;
    this.timeAccelerators = props.timeAccelerators;
    this.analysisToolClient = props.analysisToolClient;
  }
}
