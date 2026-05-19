import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialCategoryRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.entity';
import type { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';

export abstract class SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway {
  public abstract createSpecialCategoryRetirementAnalysisRemuneration(
    props: SpecialCategoryRetirementAnalysisRemunerationEntity,
  ): TransactionType;

  public abstract updateSpecialCategoryRetirementAnalysisRemuneration(
    id: SpecialCategoryRetirementAnalysisRemunerationId,
    props: SpecialCategoryRetirementAnalysisRemunerationEntity,
  ): TransactionType;

  public abstract deleteSpecialCategoryRetirementAnalysisRemuneration(
    id: SpecialCategoryRetirementAnalysisRemunerationId,
  ): TransactionType;
}
