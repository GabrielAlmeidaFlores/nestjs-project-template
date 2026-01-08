import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRgpsEarningsHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-earnings-history/value-object/retirement-planning-rgps-earnings-history-id.value-object';
import type { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';

export interface RetirementPlanningRgpsEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  retirementPlanningRgps?: RetirementPlanningRgpsEntity | null;
  retirementPlanningRgpsPeriod?: RetirementPlanningRgpsPeriodEntity | null;
  competenceBelowTheMinimum?: boolean | null;
}
