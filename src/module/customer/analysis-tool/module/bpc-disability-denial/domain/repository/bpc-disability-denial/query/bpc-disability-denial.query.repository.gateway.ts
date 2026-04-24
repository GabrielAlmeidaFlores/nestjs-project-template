import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetBpcDisabilityDenialWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-with-relations.query.result';
import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class BpcDisabilityDenialQueryRepositoryGateway {
  public abstract findOneByBpcDisabilityDenialIdAndOrganizationIdOrFail(
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcDisabilityDenialWithRelationsQueryResult>;
}
