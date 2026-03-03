import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import type { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';

export interface InsuranceQualityAnalysisEntityPropsInterface extends BaseEntityPropsInterface<InsuranceQualityAnalysisId> {
  analysisToolClientId: AnalysisToolClientId;
  analysisBenefitNumber?: string | null;
  analysisBenefitType?: string | null;
  analysisBenefitConcessionDate?: Date | null;
  analysisBenefitCessationDate?: Date | null;
  analysisHasPreviousBenefit?: boolean | null;
  analysisPreviousBenefitDetails?: string | null;
  analysisContributionSituation?: string | null;
  analysisHasRuralActivity?: boolean | null;
  analysisRuralActivityDetails?: string | null;
  analysisIsWorkAccidentOrSeriousIllness?: boolean | null;
  analysisIsSeriousIllnessArt151?: boolean | null;
  analysisSeriousIllnesses?: string | null;
  analysisOtherSeriousIllness?: string | null;
  analysisDiseaseStartDate?: Date | null;
  analysisRuralStartDate?: Date | null;
  analysisRuralEndDate?: Date | null;
  analysisHadInvoluntaryUnemployment?: boolean | null;
  analysisIntendsToProveByTestimony?: boolean | null;
  insuranceQualityAnalysisResult?: InsuranceQualityAnalysisResultEntity | null;
}
