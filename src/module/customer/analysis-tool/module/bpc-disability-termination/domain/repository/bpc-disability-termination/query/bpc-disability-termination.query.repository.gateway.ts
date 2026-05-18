import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetBpcDisabilityTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-with-relations.query.result';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class BpcDisabilityTerminationQueryRepositoryGateway {
  public abstract findOneByBpcDisabilityTerminationIdAndOrganizationIdOrFail(
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcDisabilityTerminationWithRelationsQueryResult>;
}
