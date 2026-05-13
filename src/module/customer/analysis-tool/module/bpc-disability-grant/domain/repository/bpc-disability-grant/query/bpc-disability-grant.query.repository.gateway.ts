import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetBpcDisabilityGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-with-relations.query.result';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class BpcDisabilityGrantQueryRepositoryGateway {
  public abstract findOneByBpcDisabilityGrantIdAndOrganizationIdOrFail(
    BpcDisabilityGrantId: BpcDisabilityGrantId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcDisabilityGrantWithRelationsQueryResult>;
}
