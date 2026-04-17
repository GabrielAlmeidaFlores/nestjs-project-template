import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import type { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/value-object/disability-retirement-planning-rejection-period-earnings-history-id/disability-retirement-planning-rejection-period-earnings-history-id.value-object';

export interface DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId> {
  competence?: Date | null;
  value?: string | null;
  disabilityRetirementPlanningRejectionPeriodId: DisabilityRetirementPlanningRejectionPeriodId;
}
