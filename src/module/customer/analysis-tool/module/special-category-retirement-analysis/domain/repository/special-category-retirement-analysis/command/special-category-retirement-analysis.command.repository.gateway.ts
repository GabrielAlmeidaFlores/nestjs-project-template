import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialCategoryRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

export abstract class SpecialCategoryRetirementAnalysisCommandRepositoryGateway {
  public abstract createSpecialCategoryRetirementAnalysis(
    props: SpecialCategoryRetirementAnalysisEntity,
  ): TransactionType;

  public abstract updateSpecialCategoryRetirementAnalysis(
    id: SpecialCategoryRetirementAnalysisId,
    props: SpecialCategoryRetirementAnalysisEntity,
  ): TransactionType;

  public abstract deleteSpecialCategoryRetirementAnalysis(
    id: SpecialCategoryRetirementAnalysisId,
  ): TransactionType;
}
