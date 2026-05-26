import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/enum/temporary-disability-benefits-terminated-severe-disease.enum';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/enum/temporary-disability-benefits-terminated-disability-analysis-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/temporary-disability-benefits-terminated-document.entity';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/enum/temporary-disability-benefits-terminated-insured-status-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/enum/temporary-disability-benefits-terminated-previous-benefit-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/enum/temporary-disability-benefits-terminated-work-period-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-period-consideration.enum';

export class GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult {
  public readonly id: TemporaryDisabilityBenefitsTerminatedId;
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly benefitCessationDate: Date | null;
  public readonly category: TemporaryDisabilityBenefitsTerminatedCategoryEnum | null;
  public readonly myInssPassword: string | null;
  public readonly benefitCessationReason: string | null;
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

  public readonly documents:
    | TemporaryDisabilityBenefitsTerminatedDocumentEntity[]
    | null;

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
    severeDisease: TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum | null;
    diseaseCustomName: string | null;
    diseaseStartDate: Date | null;
    needsConstantAssistanceFromAnotherPerson: boolean;
    previousDisabilityBenefit: boolean;
    previousBenefits: Array<{
      id: string;
      benefitNumber: string;
      documents: Array<{
        id: string;
        fileName: string;
        type: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum;
      }>;
    }>;
    cids: Array<{
      id: string;
      cidTenId: string;
    }>;
    documents: Array<{
      id: string;
      fileName: string;
      type: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum;
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
      type: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeEnum;
    }>;
  }>;

  public readonly workPeriods: Array<{
    id: string;
    bondOrigin: string | null;
    startDate: Date;
    endDate: Date | null;
    category: TemporaryDisabilityBenefitsTerminatedCategoryEnum | null;
    activityDescription: string | null;
    competenceBelowTheMinimum: boolean;
    pendencyReason: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum | null;
    periodConsideration: TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum | null;
    contributionAverage: DecimalValue | null;
    impactMonths: number | null;
    gracePeriod: number | null;
    isPendency: boolean;
    wantsToComplementViaMeuINSS: boolean | null;
    status: boolean;
    isManualPeriod: boolean;
    documents: Array<{
      id: string;
      fileName: string | null;
      type: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum | null;
    }>;
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
    GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult.name;

  public constructor(
    props: GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
  ) {
    this.id = props.id;
    this.analysisName = props.analysisName;
    this.requestEntryDate = props.requestEntryDate;
    this.benefitCessationDate = props.benefitCessationDate;
    this.category = props.category;
    this.myInssPassword = props.myInssPassword;
    this.benefitCessationReason = props.benefitCessationReason;
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
