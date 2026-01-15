import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import type { GetSpecialActivityWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity/query/result/get-special-activity-with-relations.query.result';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SpecialActivityQueryRepositoryGateway {
  public abstract findOneBySpecialActivityIdAndOrganizationIdWithRelationsOrFail(
    id: SpecialActivityId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpecialActivityWithRelationsQueryResult>;
}
