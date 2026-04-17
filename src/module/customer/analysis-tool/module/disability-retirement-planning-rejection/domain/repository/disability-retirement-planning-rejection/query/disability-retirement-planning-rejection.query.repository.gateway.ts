import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/result/get-disability-retirement-planning-rejection-with-relations.query.result';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class DisabilityRetirementPlanningRejectionQueryRepositoryGateway {
  public abstract findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
    id: DisabilityRetirementPlanningRejectionId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult>;
}
