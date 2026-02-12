import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PerCapitaIncomeForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import type { PerCapitaIncomeForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/value-object/per-capita-income-for-bpc-analysis-legal-proceeding-id/per-capita-income-for-bpc-analysis-legal-proceeding-id.value-object';

export abstract class PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createPerCapitaIncomeForBpcAnalysisLegalProceeding(
    props: PerCapitaIncomeForBpcAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deletePerCapitaIncomeForBpcAnalysisLegalProceeding(
    id: PerCapitaIncomeForBpcAnalysisLegalProceedingId,
  ): TransactionType;
}
