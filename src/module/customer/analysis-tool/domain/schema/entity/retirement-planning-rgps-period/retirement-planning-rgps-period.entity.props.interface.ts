import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

export interface RetirementPlanningRgpsPeriodEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsPeriodId> {
  periodName?: string | null;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  category?: string | null;
  isPendency?: boolean | null;
  competenceBelowTheMinimum?: boolean | null;
  contributionAverage?: number | null;
  typeOfContribution?: string | null;
  retirementPlanningRgps?: RetirementPlanningRgpsEntity | null;
}
