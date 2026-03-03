import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import type { PerCapitaIncomeForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/value-object/per-capita-income-for-bpc-analysis-benefit-id/per-capita-income-for-bpc-analysis-benefit-id.value-object';

export interface PerCapitaIncomeForBpcAnalysisBenefitEntityPropsInterface extends BaseEntityPropsInterface<PerCapitaIncomeForBpcAnalysisBenefitId> {
  inssBenefitNumber: string;
  perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;
}
