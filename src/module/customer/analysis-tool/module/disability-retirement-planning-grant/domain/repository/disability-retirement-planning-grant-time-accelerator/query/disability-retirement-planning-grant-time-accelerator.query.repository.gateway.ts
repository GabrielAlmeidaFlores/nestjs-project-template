import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/query/result/get-disability-retirement-planning-grant-time-accelerator.query.result';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class DisabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway {
  public abstract findOneByDisabilityRetirementPlanningGrantTimeAcceleratorIdOrFail(
    id: DisabilityRetirementPlanningGrantTimeAcceleratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult>;
}
