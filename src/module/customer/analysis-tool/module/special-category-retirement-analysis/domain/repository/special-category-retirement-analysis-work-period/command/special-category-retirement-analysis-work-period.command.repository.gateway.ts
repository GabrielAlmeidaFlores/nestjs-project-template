import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialCategoryRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.entity';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

export abstract class SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway {
  public abstract createSpecialCategoryRetirementAnalysisWorkPeriod(
    props: SpecialCategoryRetirementAnalysisWorkPeriodEntity,
  ): TransactionType;

  public abstract updateSpecialCategoryRetirementAnalysisWorkPeriod(
    id: SpecialCategoryRetirementAnalysisWorkPeriodId,
    props: SpecialCategoryRetirementAnalysisWorkPeriodEntity,
  ): TransactionType;

  public abstract deleteSpecialCategoryRetirementAnalysisWorkPeriod(
    id: SpecialCategoryRetirementAnalysisWorkPeriodId,
  ): TransactionType;
}
