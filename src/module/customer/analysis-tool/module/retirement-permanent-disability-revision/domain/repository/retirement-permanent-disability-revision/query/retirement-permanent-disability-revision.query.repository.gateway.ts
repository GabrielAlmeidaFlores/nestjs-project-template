import type { NotFoundError } from '@core/error/not-found.error';
import type { GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/result/get-retirement-permanent-disability-revision-with-relations.query.result';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPermanentDisabilityRevisionQueryRepositoryGateway {
  public abstract findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
    id: RetirementPermanentDisabilityRevisionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult>;
}
