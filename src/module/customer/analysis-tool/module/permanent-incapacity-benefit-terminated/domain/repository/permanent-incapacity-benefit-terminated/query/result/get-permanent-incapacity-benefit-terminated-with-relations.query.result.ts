import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import type { PermanentIncapacityBenefitTerminatedReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-reason.enum';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/enum/permanent-incapacity-benefit-terminated-severe-disease.enum';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/enum/permanent-incapacity-benefit-terminated-disability-analysis-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/enum/permanent-incapacity-benefit-terminated-insured-status-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';

export class GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult {
  public readonly id: PermanentIncapacityBenefitTerminatedId;
  public readonly analysisName: string | null;
  public readonly benefitTerminationDate: Date | null;
  public readonly category: PermanentIncapacityBenefitTerminatedCategoryEnum | null;
  public readonly terminationReason: PermanentIncapacityBenefitTerminatedReasonEnum | null;
  public readonly terminationReasonDescription: string | null;
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
    type: PermanentIncapacityBenefitTerminatedDocumentTypeEnum;
  }>;

  public readonly inssBenefits: Array<{
    id: string;
    inssBenefit: string;
  }>;

  public readonly disabilityAnalysis: Array<{
    id: string;
    estimatedDisabilityStartDate: Date;
    shortDisabilityDescription: string | null;
    disabilityFromAccident: boolean;
    disablingConditionDescription: string | null;
    disabilityFromSevereDisease: boolean;
    severeDisease: PermanentIncapacityBenefitTerminatedSevereDiseaseEnum | null;
    diseaseCustomName: string | null;
    diseaseStartDate: Date | null;
    needsConstantAssistanceFromAnotherPerson: boolean;
    previousDisabilityBenefit: boolean;
    previousBenefitNumber: string | null;
    cids: Array<{
      id: string;
      cidTenId: string;
    }>;
    documents: Array<{
      id: string;
      fileName: string;
      type: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum;
    }>;
  }>;

  public readonly insuredStatus: Array<{
    id: string;
    involuntaryUnemployment: boolean;
    intentionToProveInvoluntaryUnemployment: boolean;
    ruralInsuredClient: boolean;
    ruralPeriodStartDate: Date | null;
    ruralPeriodEndDate: Date | null;
    documentsDescription: string | null;
    documents: Array<{
      id: string;
      fileName: string;
      type: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeEnum;
    }>;
  }>;

  public readonly workPeriods: Array<{
    id: string;
    bondOrigin: string | null;
    startDate: Date;
    endDate: Date | null;
    category: PermanentIncapacityBenefitTerminatedCategoryEnum | null;
    activityDescription: string | null;
    competenceBelowTheMinimum: boolean;
    pendencyReason: PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum | null;
    periodConsideration: PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum | null;
    contributionAverage: DecimalValue | null;
    impactMonths: number | null;
    gracePeriod: number | null;
    isPendency: boolean;
    wantsToComplementViaMeuINSS: boolean | null;
    status: boolean;
    earningsHistory: Array<{
      id: string;
      competence: Date | null;
      remuneration: string | null;
      indicators: string | null;
      paymentDate: Date | null;
      contribution: string | null;
      contributionSalary: string | null;
      competenceBelowTheMinimum: boolean | null;
    }>;
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
    GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult.name;

  public constructor(
    props: GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult,
  ) {
    this.id = props.id;
    this.analysisName = props.analysisName;
    this.benefitTerminationDate = props.benefitTerminationDate;
    this.category = props.category;
    this.terminationReason = props.terminationReason;
    this.terminationReasonDescription = props.terminationReasonDescription;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.result = props.result;
    this.documents = props.documents;
    this.inssBenefits = props.inssBenefits;
    this.disabilityAnalysis = props.disabilityAnalysis;
    this.insuredStatus = props.insuredStatus;
    this.workPeriods = props.workPeriods;
    this.analysisToolClient = props.analysisToolClient;
  }
}
