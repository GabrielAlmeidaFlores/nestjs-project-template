import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import type { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/value-object/rural-or-hybrid-retirement-analysis-work-period-earnings-history-id.value-object';

export interface RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId> {
  competence?: string | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowMinimum?: boolean | null;
  ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId;
}
