import type { NotFoundError } from '@core/error/not-found.error';
import type { GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/result/get-retirement-permanent-disability-rejection-with-relations.query.result';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class RetirementPermanentDisabilityRejectionQueryRepositoryGateway {
  public abstract findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
    id: RetirementPermanentDisabilityRejectionId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult>;
}
