import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PerCapitaIncomeForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.entity';
import type { PerCapitaIncomeForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/value-object/per-capita-income-for-bpc-analysis-benefit-id/per-capita-income-for-bpc-analysis-benefit-id.value-object';

export abstract class PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway {
  public abstract createPerCapitaIncomeForBpcAnalysisBenefit(
    props: PerCapitaIncomeForBpcAnalysisBenefitEntity,
  ): TransactionType;

  public abstract deletePerCapitaIncomeForBpcAnalysisBenefit(
    id: PerCapitaIncomeForBpcAnalysisBenefitId,
  ): TransactionType;
}
