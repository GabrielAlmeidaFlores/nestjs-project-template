import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialCategoryRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/special-category-retirement-analysis-result.entity';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

export abstract class SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway {
  public abstract createSpecialCategoryRetirementAnalysisResult(
    props: SpecialCategoryRetirementAnalysisResultEntity,
  ): TransactionType;

  public abstract updateSpecialCategoryRetirementAnalysisResult(
    id: SpecialCategoryRetirementAnalysisResultId,
    props: SpecialCategoryRetirementAnalysisResultEntity,
  ): TransactionType;
}
