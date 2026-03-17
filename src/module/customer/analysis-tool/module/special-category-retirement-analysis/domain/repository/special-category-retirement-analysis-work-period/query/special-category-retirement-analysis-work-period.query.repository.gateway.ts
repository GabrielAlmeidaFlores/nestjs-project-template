import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/result/get-special-category-retirement-analysis-work-period.query.result';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: SpecialCategoryRetirementAnalysisWorkPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult>;

  public abstract listByAnalysisId(
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult[]>;
}
