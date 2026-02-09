import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-benefit.query.result';
import type { GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-document.query.result';
import type { GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-family-member.query.result';
import type { GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-legal-proceeding.query.result';
import type { GetPerCapitaIncomeForBpcAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-result/query/result/get-per-capita-income-for-bpc-analysis-result.query.result';
import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

export class GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: PerCapitaIncomeForBpcAnalysisId;
  public readonly perCapitaIncomeForBpcAnalysisResult: GetPerCapitaIncomeForBpcAnalysisResultQueryResult | null;
  public readonly perCapitaIncomeForBpcAnalysisFamilyMember: GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult[];
  public readonly perCapitaIncomeForBpcAnalysisDocument: GetPerCapitaIncomeForBpcAnalysisDocumentQueryResult[];
  public readonly perCapitaIncomeForBpcAnalysisBenefit: GetPerCapitaIncomeForBpcAnalysisBenefitQueryResult[];
  public readonly perCapitaIncomeForBpcAnalysisLegalProceeding: GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult.name;
}
