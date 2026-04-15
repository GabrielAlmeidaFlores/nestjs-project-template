import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history/value-object/rural-or-hybrid-retirement-rejection-work-period-earnings-history-id.value-object';
import type { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';

export interface RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId> {
  competence?: string | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowMinimum?: boolean | null;
  ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId;
}
