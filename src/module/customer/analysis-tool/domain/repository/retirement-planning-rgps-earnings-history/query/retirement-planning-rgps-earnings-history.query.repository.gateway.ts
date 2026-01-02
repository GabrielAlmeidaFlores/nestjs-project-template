import type { RetirementPlanningRgpsEarningsHistoryEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.entity';
import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

export abstract class RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway {
  public abstract findByRetirementPlanningRgpsPeriodId(
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
  ): Promise<RetirementPlanningRgpsEarningsHistoryEntity[]>;
}
