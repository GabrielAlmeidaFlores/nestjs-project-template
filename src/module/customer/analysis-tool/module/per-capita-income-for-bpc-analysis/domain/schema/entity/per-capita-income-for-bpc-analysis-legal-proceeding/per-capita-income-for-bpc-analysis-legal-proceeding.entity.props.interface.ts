import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import type { PerCapitaIncomeForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/value-object/per-capita-income-for-bpc-analysis-legal-proceeding-id/per-capita-income-for-bpc-analysis-legal-proceeding-id.value-object';

export interface PerCapitaIncomeForBpcAnalysisLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<PerCapitaIncomeForBpcAnalysisLegalProceedingId> {
  legalProceedingNumber: string;
  perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;
}
