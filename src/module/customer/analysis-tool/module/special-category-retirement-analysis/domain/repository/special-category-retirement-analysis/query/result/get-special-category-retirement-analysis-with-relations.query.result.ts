import { GetSpecialCategoryRetirementAnalysisQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/result/get-special-category-retirement-analysis.query.result';
import type { GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/result/get-special-category-retirement-analysis-work-period.query.result';
import type { GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/query/result/get-special-category-retirement-analysis-period-document.query.result';
import type { GetSpecialCategoryRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/result/get-special-category-retirement-analysis-remuneration.query.result';
import type { GetSpecialCategoryRetirementAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/result/get-special-category-retirement-analysis-result.query.result';
import type { GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/query/result/get-special-category-retirement-analysis-result-conversion-item.query.result';
import type { GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/query/result/get-special-category-retirement-analysis-result-rule-item.query.result';

export class GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult extends GetSpecialCategoryRetirementAnalysisQueryResult {
  public readonly workPeriods: GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult[];
  public readonly periodDocuments: GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult[];
  public readonly remunerations: GetSpecialCategoryRetirementAnalysisRemunerationQueryResult[];
  public readonly analysisResult: GetSpecialCategoryRetirementAnalysisResultQueryResult | null;
  public readonly conversionItems: GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult[];
  public readonly ruleItems: GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult[];

  protected override readonly _type = GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult.name;
}
