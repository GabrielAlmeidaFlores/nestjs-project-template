import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/query/result/get-special-category-retirement-analysis-period-document.query.result';
import type { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SpecialCategoryRetirementAnalysisPeriodDocumentQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: SpecialCategoryRetirementAnalysisPeriodDocumentId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult>;

  public abstract listByWorkPeriodId(
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
  ): Promise<GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult[]>;
}
