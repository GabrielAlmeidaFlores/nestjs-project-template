import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetSpecialActivityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/result/get-special-activity-analysis-with-relations.query.result';
import type { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SpecialActivityAnalysisQueryRepositoryGateway {
  public abstract findOneBySpecialActivityIdAndOrganizationIdWithRelationsOrFail(
    id: SpecialActivityId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpecialActivityAnalysisWithRelationsQueryResult>;
}
