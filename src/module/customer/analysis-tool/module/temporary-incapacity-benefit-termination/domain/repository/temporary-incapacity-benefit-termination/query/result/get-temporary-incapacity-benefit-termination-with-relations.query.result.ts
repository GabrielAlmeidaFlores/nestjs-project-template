import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import type { TemporaryIncapacityBenefitTerminationReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-reason.enum';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/enum/temporary-incapacity-benefit-termination-severe-disease.enum';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/enum/temporary-incapacity-benefit-termination-disability-analysis-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/enum/temporary-incapacity-benefit-termination-insured-status-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-period-consideration.enum';

export class GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult {
  public readonly id: TemporaryIncapacityBenefitTerminationId;
  public readonly analysisName: string | null;
  public readonly benefitTerminationDate: Date | null;
  public readonly category: TemporaryIncapacityBenefitTerminationCategoryEnum | null;
  public readonly terminationReason: TemporaryIncapacityBenefitTerminationReasonEnum | null;
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
    type: TemporaryIncapacityBenefitTerminationDocumentTypeEnum;
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
    severeDisease: TemporaryIncapacityBenefitTerminationSevereDiseaseEnum | null;
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
      type: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum;
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
      type: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeEnum;
    }>;
  }>;

  public readonly workPeriods: Array<{
    id: string;
    bondOrigin: string | null;
    startDate: Date;
    endDate: Date | null;
    category: TemporaryIncapacityBenefitTerminationCategoryEnum | null;
    activityDescription: string | null;
    competenceBelowTheMinimum: boolean;
    pendencyReason: TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum | null;
    periodConsideration: TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum | null;
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
    GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult.name;

  public constructor(
    props: GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult,
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
