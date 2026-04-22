import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import type { TemporaryIncapacityBenefitRejectionConditionEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-condition.enum';
import type { TemporaryIncapacityBenefitRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-denial-reason.enum';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/enum/temporary-incapacity-benefit-rejection-severe-disease.enum';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/enum/temporary-incapacity-benefit-rejection-disability-analysis-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/enum/temporary-incapacity-benefit-rejection-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/enum/temporary-incapacity-benefit-rejection-insured-status-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-period-consideration.enum';

export class GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult {
  public readonly id: TemporaryIncapacityBenefitRejectionId;
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly requestedBenefitType: string | null;
  public readonly category: TemporaryIncapacityBenefitRejectionCategoryEnum | null;
  public readonly denialReason: TemporaryIncapacityBenefitRejectionDenialReasonEnum | null;
  public readonly denialReasonDescription: string | null;
  public readonly condition: TemporaryIncapacityBenefitRejectionConditionEnum | null;
  public readonly conditionDescription: string | null;
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
    type: TemporaryIncapacityBenefitRejectionDocumentTypeEnum;
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
    severeDisease: TemporaryIncapacityBenefitRejectionSevereDiseaseEnum | null;
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
      type: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum;
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
      type: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum;
    }>;
  }>;

  public readonly workPeriods: Array<{
    id: string;
    bondOrigin: string;
    startDate: Date;
    endDate: Date | null;
    category: TemporaryIncapacityBenefitRejectionCategoryEnum;
    competenceBelowTheMinimum: boolean;
    pendencyReason: TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum | null;
    periodConsideration: TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum | null;
    contributionAverage: DecimalValue | null;
    status: boolean;
    gracePeriod: number;
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
    GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult.name;

  public constructor(
    props: GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult,
  ) {
    this.id = props.id;
    this.analysisName = props.analysisName;
    this.requestEntryDate = props.requestEntryDate;
    this.denialDate = props.denialDate;
    this.requestedBenefitType = props.requestedBenefitType;
    this.category = props.category;
    this.denialReason = props.denialReason;
    this.denialReasonDescription = props.denialReasonDescription;
    this.condition = props.condition;
    this.conditionDescription = props.conditionDescription;
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
