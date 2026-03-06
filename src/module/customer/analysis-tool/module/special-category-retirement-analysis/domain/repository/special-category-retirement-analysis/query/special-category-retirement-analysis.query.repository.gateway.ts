import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/result/get-special-category-retirement-analysis-with-relations.query.result';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SpecialCategoryRetirementAnalysisQueryRepositoryGateway {
  public abstract findOneByIdAndOrganizationIdWithRelationsOrFail(
    id: SpecialCategoryRetirementAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpecialCategoryRetirementAnalysisWithRelationsQueryResult>;
}
