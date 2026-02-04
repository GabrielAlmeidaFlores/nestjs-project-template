import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import type { PerCapitaIncomeForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/value-object/per-capita-income-for-bpc-analysis-result-id/per-capita-income-for-bpc-analysis-result-id.value-object';

export interface PerCapitaIncomeForBpcAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<PerCapitaIncomeForBpcAnalysisResultId> {
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
  perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;
}
