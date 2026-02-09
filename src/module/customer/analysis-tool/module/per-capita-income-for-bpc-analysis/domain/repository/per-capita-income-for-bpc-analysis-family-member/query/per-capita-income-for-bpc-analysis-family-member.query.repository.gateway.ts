import type { GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-family-member.query.result';
import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

export abstract class PerCapitaIncomeForBpcAnalysisFamilyMemberQueryRepositoryGateway {
  public abstract findByPerCapitaIncomeForBpcAnalysisId(
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): Promise<GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult[]>;
}
