import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetBpcElderlyCessationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-with-relations.query.result';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class BpcElderlyCessationQueryRepositoryGateway {
  public abstract findOneByBpcElderlyCessationIdAndOrganizationIdOrFail(
    bpcElderlyCessationId: BpcElderlyCessationId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcElderlyCessationWithRelationsQueryResult>;
}
