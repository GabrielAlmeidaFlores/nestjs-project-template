import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/query/result/get-disability-retirement-planning-rejection-time-accelerator.query.result';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway {
  public abstract findOneByDisabilityRetirementPlanningRejectionTimeAcceleratorIdOrFail(
    id: DisabilityRetirementPlanningRejectionTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult>;

  public abstract findByDisabilityRetirementPlanningRejectionId(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<
    GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult[]
  >;
}
