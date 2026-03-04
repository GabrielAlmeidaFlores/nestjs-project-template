import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialCategoryRetirementAnalysisResultRuleItemEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/special-category-retirement-analysis-result-rule-item.entity';

export abstract class SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway {
  public abstract createSpecialCategoryRetirementAnalysisResultRuleItem(
    props: SpecialCategoryRetirementAnalysisResultRuleItemEntity,
  ): TransactionType;

  public abstract deleteAllByResultId(
    resultId: import('@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object').SpecialCategoryRetirementAnalysisResultId,
  ): TransactionType;
}
