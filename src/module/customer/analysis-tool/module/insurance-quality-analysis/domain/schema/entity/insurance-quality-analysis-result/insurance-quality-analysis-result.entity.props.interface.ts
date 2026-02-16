import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';

export interface InsuranceQualityAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<InsuranceQualityAnalysisResultId> {
  insuranceQualityConclusion?: string | null;
  gracePeriodConclusion?: string | null;
  finalRecommendation?: string | null;
  analysisSummary?: string | null;
}
