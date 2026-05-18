import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDisabilityRetirementPlanningGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/result/get-disability-retirement-planning-grant-with-relations.query.result';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class DisabilityRetirementPlanningGrantQueryRepositoryGateway {
  public abstract findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
    id: DisabilityRetirementPlanningGrantId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningGrantWithRelationsQueryResult>;
}
