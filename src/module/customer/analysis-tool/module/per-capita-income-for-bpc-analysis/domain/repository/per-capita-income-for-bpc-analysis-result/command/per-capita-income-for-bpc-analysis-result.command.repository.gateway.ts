import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';
import type { PerCapitaIncomeForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/value-object/per-capita-income-for-bpc-analysis-result-id/per-capita-income-for-bpc-analysis-result-id.value-object';

export abstract class PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway {
  public abstract createPerCapitaIncomeForBpcAnalysisResult(
    props: PerCapitaIncomeForBpcAnalysisResultEntity,
  ): TransactionType;

  public abstract updatePerCapitaIncomeForBpcAnalysisResult(
    id: PerCapitaIncomeForBpcAnalysisResultId,
    props: PerCapitaIncomeForBpcAnalysisResultEntity,
  ): TransactionType;
}
