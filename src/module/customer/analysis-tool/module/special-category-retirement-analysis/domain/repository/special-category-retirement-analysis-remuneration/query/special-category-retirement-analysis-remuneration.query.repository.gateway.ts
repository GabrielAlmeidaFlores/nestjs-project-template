import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSpecialCategoryRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/result/get-special-category-retirement-analysis-remuneration.query.result';
import type { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: SpecialCategoryRetirementAnalysisRemunerationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpecialCategoryRetirementAnalysisRemunerationQueryResult>;

  public abstract listByAnalysisId(
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisRemunerationQueryResult[]>;

  public abstract findOneByAnalysisIdAndMonthYear(
    analysisId: SpecialCategoryRetirementAnalysisId,
    monthYear: Date,
  ): Promise<GetSpecialCategoryRetirementAnalysisRemunerationQueryResult | null>;
}
