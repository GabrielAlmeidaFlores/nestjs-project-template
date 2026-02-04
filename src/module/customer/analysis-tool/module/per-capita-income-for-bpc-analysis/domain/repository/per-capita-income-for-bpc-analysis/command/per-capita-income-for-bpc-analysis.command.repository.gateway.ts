import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

export abstract class PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway {
  public abstract createPerCapitaIncomeForBpcAnalysis(
    props: PerCapitaIncomeForBpcAnalysisEntity,
  ): TransactionType;

  public abstract updatePerCapitaIncomeForBpcAnalysis(
    id: PerCapitaIncomeForBpcAnalysisId,
    props: PerCapitaIncomeForBpcAnalysisEntity,
  ): TransactionType;

  public abstract deletePerCapitaIncomeForBpcAnalysis(
    id: PerCapitaIncomeForBpcAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
