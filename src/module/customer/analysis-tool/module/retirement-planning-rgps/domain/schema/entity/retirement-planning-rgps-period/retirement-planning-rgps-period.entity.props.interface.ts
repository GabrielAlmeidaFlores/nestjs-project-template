import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/enum/reason-pendency.enum';
import type { ValidContributionTimeEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/valid-contribution-time/valid-contribution-time.entity';
import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

export interface RetirementPlanningRgpsPeriodEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsPeriodId> {
  sequencial?: number | null;
  periodName?: string | null;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  category?: string | null;
  isPendency?: boolean | null;
  competenceBelowTheMinimum?: boolean | null;
  contributionAverage?: DecimalValue | null;
  typeOfContribution?: string | null;
  retirementPlanningRgps?: RetirementPlanningRgpsEntity | null;
  status?: boolean | null;
  reasonPendency?: ReasonPendencyEnum | null;
  validContributionTime?: ValidContributionTimeEntity | null;
}
