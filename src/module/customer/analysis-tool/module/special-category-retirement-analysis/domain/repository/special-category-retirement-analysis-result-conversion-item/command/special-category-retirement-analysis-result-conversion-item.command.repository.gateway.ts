import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialCategoryRetirementAnalysisResultConversionItemEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/special-category-retirement-analysis-result-conversion-item.entity';

export abstract class SpecialCategoryRetirementAnalysisResultConversionItemCommandRepositoryGateway {
  public abstract createSpecialCategoryRetirementAnalysisResultConversionItem(
    props: SpecialCategoryRetirementAnalysisResultConversionItemEntity,
  ): TransactionType;

  public abstract deleteAllByResultId(
    resultId: import('@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object').SpecialCategoryRetirementAnalysisResultId,
  ): TransactionType;
}
