import type { GetRetirementPlanningRgpsTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/result/get-retirement-planning-rgps-time-accelerator.query.result';
import type { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningRgpsTimeAcceleratorIdOrFail(
    id: RetirementPlanningRgpsTimeAcceleratorId,
    err: ConstructorType<Error>,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorQueryResult>;

  public abstract findByRetirementPlanningRgpsId(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorQueryResult[]>;
}
