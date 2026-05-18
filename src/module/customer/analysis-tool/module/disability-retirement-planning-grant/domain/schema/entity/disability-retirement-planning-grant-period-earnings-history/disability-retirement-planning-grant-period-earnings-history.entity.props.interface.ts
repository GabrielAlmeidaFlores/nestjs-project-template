import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import type { DisabilityRetirementPlanningGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/value-object/disability-retirement-planning-grant-period-earnings-history-id.value-object';

export interface DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantPeriodEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  analysis?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId;
}
