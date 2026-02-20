import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';

export interface RuralTimelineCnisContributionPeriodOverdueContributionEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineCnisContributionPeriodOverdueContributionId> {
  overdueDate: Date;
  paymentDate?: Date | null;
  ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;
}
