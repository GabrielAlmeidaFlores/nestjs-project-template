import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyCessationResultId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/value-object/bpc-elderly-cessation-result-id/bpc-elderly-cessation-result-id.value-object';

export interface BpcElderlyCessationResultEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyCessationResultId> {
  inssDecisionAnalysis?: string | null;
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysis?: string | null;
  applicableRules?: string | null;
  benefitSummaries?: string | null;
  analysisDetailedText?: string | null;
  diagnosis?: string | null;
  totalHouseholdIncome?: number | null;
  perCapitaIncome?: number | null;
  legalRequirementsMet?: string | null;
  perCapitaIncomeBelowQuarterMinimumWage?: string | null;
  ageEqualOrAbove65Years?: string | null;
}
